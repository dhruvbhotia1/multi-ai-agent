import {ApiResponse} from "@/lib/types/ApiResponse";
import type {Conversation} from "../../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";
import {getServerSession} from "@/lib/user/getServerSession";

export const getConversationById = async (conversationId: string, userId: string): Promise<ApiResponse<Conversation>> => {

    try {

        const data = await getServerSession();

        if(data.status === "error") {

            return {
                status: "error",
                errorMessage: "UNAUTHORIZED_ACCESS",
                data: null
            }
        }

        if(data.data.user.id !== userId) {

            return {
                status: "error",
                errorMessage: "UNSER_ID_MISMATCH_ERR",
                data: null
            }

        }

        const result = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
                userId: userId,
            }
        })

        if(!result) {

            return {
                status: "error",
                errorMessage: "NO_CONVERSATION_FOUND",
                data: null
            }
        }

        return {

            status: "success",
            message: "FOUND_CONVERSATION",
            data: result
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