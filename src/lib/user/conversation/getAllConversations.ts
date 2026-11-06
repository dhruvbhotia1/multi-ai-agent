"use server"

import {ApiResponse} from "@/lib/types/ApiResponse";
import type {Conversation} from "../../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";

export const getAllConversations = async (userId: string): Promise<ApiResponse<Conversation[] | []>> => {

    try {


        const conversations = await prisma.conversation.findMany({
            where: {
                userId: userId,
            }
        })


        if(!conversations) {

            return {
                status: "error",
                errorMessage: "NO_CONVERSATIONS_FOR_USER",
                data: []
            }
        }

        return {

            status: "success",
            message: "ALL_CONVERSATION_LOADED",
            data: conversations
        }


    } catch (error) {

        console.log(error)

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: []
        }


    }

}