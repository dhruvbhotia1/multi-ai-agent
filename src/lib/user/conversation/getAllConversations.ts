"use server"

import {ApiResponse, user} from "@/lib/types/ApiResponse";
import type {Conversation} from "../../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";
import { setRedisKey } from "../setRedisKey";
import { redis } from "@/lib/redis";

export const getAllConversations = async (sessionId: string): Promise<ApiResponse<Conversation[] | []>> => {

    try {


        const user = await redis.hget<user>(sessionId, "user");

        if (!user) {

            return {

                status: "error",
                errorMessage: "USER_SESSION_NOT_FOUND",
                data: null
            }
        }

        const cachedConvos = await redis.hget<Conversation[]>(sessionId, "conversationList");

        if (cachedConvos) {

            return {

                status: "success",
                message: "CACHED_DATA_FOUND!",
                data: cachedConvos
            }
        }

        const conversations = await prisma.conversation.findMany({
            where: {
                userId: user.id,
            }
        });


        if(!conversations) {

            return {
                status: "error",
                errorMessage: "NO_CONVERSATIONS_FOR_USER",
                data: null
            }
        }

        await setRedisKey(sessionId, { conversationList: conversations });

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
            data: null
        }


    }

}
