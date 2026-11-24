"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import {ChevronDown, PlusIcon} from "lucide-react";
import {useConfirm} from "@/hooks/use-confirm";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import { useRef, useState} from "react";

import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import {toast} from "sonner";
import {createConversation} from "@/lib/user/conversation/createConversation";
import {useParams, useRouter} from "next/navigation";
import type {Conversation} from "../../../generated/prisma/client";
import { redis } from "@/lib/redis";

interface Props {

    conversations: Conversation[]
}

export function StudioSidebar({ conversations}: Props) {

    const {sessionId} = useParams();

    const router = useRouter();

    const conversationName = useRef<string>("");

    const ConversationNameInput = () => (

        <Field>
            <FieldLabel>Conversation Name</FieldLabel>
            <Input type="text" placeholder="My conversation...." onChange={(e) => conversationName.current = e.target.value}/>
        </Field>
    )

    const [NewConversationDialog, addNewConvo] = useConfirm("Add a new conversation", "all conversation must have a name", ConversationNameInput())

    const [convos, setConvos] = useState<Conversation[]>(conversations)

    const addNewChat = async () => {

        const ok = await addNewConvo();

        if(!ok) return

        const result = await createConversation(conversationName.current, sessionId as string);

        if(result.status === "success") {

            setConvos((prev) => [...prev, result.data]);
            toast.success("Conversation successfully created!")

        }else {
            toast.error("some error occurred")
        }

    }

    return (

        <>
            <NewConversationDialog/>
            <Sidebar className={"mt-16"}>
                <SidebarHeader>
                    <Button variant={"outline"} className="w-full mb-4 font-bold" onClick={addNewChat}>

                        New Chat <span><PlusIcon/></span>

                    </Button>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarMenu>

                        <div>

                            <SidebarMenuItem>
                                <DropdownMenu modal={ false }>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton>
                                            Select Conversation
                                            <ChevronDown className="ml-auto"/>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {
                                            convos.map((convo) => (

                                                <DropdownMenuItem key={convo.id} onClick={() => router.push(`/studio/${sessionId}/${convo.id}`)}>

                                                    {convo.title}

                                                </DropdownMenuItem>
                                            ))
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>

                        </div>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

        </>
    )
}
