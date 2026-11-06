"use server"

import {ApiResponse} from "@/lib/types/ApiResponse";
import {getServerSession} from "@/lib/user/getServerSession";
import {prisma} from "@/lib/prisma";
import {Conversation} from "../../../../generated/prisma/client";

export const createConversation = async (title: string): Promise<ApiResponse<Conversation>> => {

    try {

        const loggedInUser = await getServerSession();

        if(!loggedInUser) {

            return {
                status: "error",
                errorMessage: "UNAUTHORIZED_ACCESS",
                data: null
            }
        }

        const userId = loggedInUser.data?.user.id as string;

        const result = await prisma.conversation.create({
            data: {
                userId: userId,
                title: title
            }
        })

        return {

            status: "success",
            message: "ADDED_CONVERSATION_TO_RECS",
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
