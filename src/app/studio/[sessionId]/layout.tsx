import { SidebarProvider } from "@/components/ui/sidebar";
import{StudioSidebar} from "@/components/studio/StudioSidebar";
import {SidebarTrigger} from "@/components/ui/sidebar";
import { getAllConversations } from "@/lib/user/conversation/getAllConversations";
import { ReactNode } from "react";

interface Props {

    children: ReactNode
    params: Promise<{sessionId: string}>
}


export default async function studioLayout({ children, params }: Props) {

    const { sessionId } = await params;

    const conversations = await getAllConversations(sessionId);

    return (

        <>
            <SidebarProvider>

                <StudioSidebar conversations={conversations.data || []} />
                <main className={"m-1.5"}>
                    <SidebarTrigger className={"absolute left-2 top-4 z-50"} />
                    {children}
                </main>

            </SidebarProvider>
        </>



    )
}
