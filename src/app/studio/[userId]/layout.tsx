import {SidebarProvider} from "@/components/ui/sidebar";
import{StudioSidebar} from "@/components/studio/StudioSidebar";
import {SidebarTrigger} from "@/components/ui/sidebar";

export default function studioLayout({ children }: {children: React.ReactNode}) {

    return (

        <SidebarProvider>
            <StudioSidebar/>
            <main>
                <SidebarTrigger className={"absolute left-2 top-4 z-50"}/>
                {children}
            </main>
        </SidebarProvider>

    )
}