import {SidebarProvider} from "@/components/ui/sidebar";
import{StudioSidebar} from "@/components/studio/StudioSidebar";
import {SidebarTrigger} from "@/components/ui/sidebar";

interface Props {

    params: Promise<{userId: string}>
}

export default async function StudioPage({params}: Props) {

    const userId = await params;

    return (
        <>

            <SidebarProvider>
                <StudioSidebar/>
                <main className={"m-1.5"}>
                    <SidebarTrigger className={"absolute left-2 top-4 z-50"}/>
                </main>
            </SidebarProvider>

        </>
    )
}
