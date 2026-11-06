"use client"

import {
    Sidebar,
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
import {buttonVariants} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";

import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import {toast} from "sonner";
import {createConversation} from "@/lib/user/conversation/createConversation";
import {useParams, useRouter} from "next/navigation";
import type {Conversation} from "../../../generated/prisma/client";
import {getAllConversations} from "@/lib/user/conversation/getAllConversations";

export function StudioSidebar() {

    const {userId} = useParams();

    const router = useRouter();

    const conversationName = useRef<string>("");

    const ConversationNameInput = () => (


        <Field>
            <FieldLabel>Conversation Name</FieldLabel>
            <Input type="text" placeholder="My conversation...." onChange={(e) => conversationName.current = e.target.value}/>
        </Field>
    )

    const [NewConversationDialog, addNewConvo] = useConfirm("Add a new conversation", "all conversation must have a name", ConversationNameInput())

    const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect(() => {
        getAllConversations(userId as string).then(res => {
            if (res.status === "success") setConversations(res.data ?? [])
        })
    }, [])

    const addNewChat = async () => {

        const ok = await addNewConvo();

        if(!ok) return

        const result = await createConversation(conversationName.current);

        if(result.status === "success") {

            const updated = await getAllConversations(userId as string)
            setConversations(updated.data ?? [])
            toast.success("Conversation successfully created!")

            toast.success("Conversation successfully created!");

        }else {
            toast.error("some error occurred")
        }

    }

    return (

        <>
            <NewConversationDialog/>
            <Sidebar className={"mt-16"}>
                <SidebarHeader>
                    <SidebarMenu>

                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={addNewChat} className={cn(buttonVariants({variant: "outline"}), "mb-4 font-medium")}>
                                New Chat <span><PlusIcon/></span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        Select Conversation
                                        <ChevronDown className="ml-auto"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {
                                        conversations.map((convo) => (

                                            <DropdownMenuItem key={convo.id} onClick={() => router.push(`/studio/${userId}/${convo.id}`)}>

                                                {convo.title}

                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
            </Sidebar>

        </>
    )
}