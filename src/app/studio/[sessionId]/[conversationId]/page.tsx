import {getConversationById} from "@/lib/user/conversation/getConversationById";

interface Props {

    params: Promise<{conversationId: string, userId: string}>
}

export default async function ConversationPage({ params }: Props) {


    const {conversationId, userId} = await params;

    const conversation = await getConversationById(conversationId, userId);

    return (
        <div>


            Conversation Page for: {conversationId}
        </div>
    )
}
