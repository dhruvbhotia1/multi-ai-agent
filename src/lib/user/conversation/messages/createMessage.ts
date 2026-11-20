import { ApiResponse } from "@/lib/types/ApiResponse"
import type { Message } from "../../../../../generated/prisma/client"
import type { SenderRole } from "../../../../../generated/prisma/client"
import { getServerSession } from "../../getServerSession"
import { getConversationById } from "../getConversationById"
import { prisma } from "@/lib/prisma"


export const createMessage = async (role: SenderRole, body: string, conversationId: string): Promise<ApiResponse<Message>> => {

    try {

        const data = await getServerSession();

        if (data.status === "error") {

            return {

                status: "error",
                errorMessage: "USER_NOT_FOUND!",
                data: null
            }
        }

        const conversation = await getConversationById(conversationId, data.data.user.id);

        if (!conversation) {

            return {

                status: "error",
                errorMessage: "NO_CONVERSATION_FOUND",
                data: null
            }
        }

        const message = await prisma.message.create({

            data: {
                senderRole: role,
                content: body,
                conversationId: conversationId
            }
        })


        return {

            status: "success",
            message: "MESSAGE_LOGGED!",
            data: message
        }
    } catch (error) {

        console.log(error);

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: null
        }
    }


}
