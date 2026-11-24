import {SidebarProvider} from "@/components/ui/sidebar";
import{StudioSidebar} from "@/components/studio/StudioSidebar";
import {SidebarTrigger} from "@/components/ui/sidebar";

interface Props {

    params: Promise<{sessionId: string}>
}

export default async function StudioPage({params}: Props) {

    const { sessionId } = await params;

    return (
        <div>
            <p>studio page for session: { sessionId } </p>
        </div>
    )
}
