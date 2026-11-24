"use server"

import {ApiResponse, user} from "@/lib/types/ApiResponse";
import {prisma} from "@/lib/prisma";
import type {Conversation} from "../../../../generated/prisma/client";
import { redis } from "@/lib/redis";
import { getAllConversations } from "./getAllConversations";

export const createConversation = async (title: string, sessionId: string): Promise<ApiResponse<Conversation>> => {

    try {

        const loggedInUser = await redis.hget<user>(sessionId, "user");

        if(!loggedInUser) {

            return {
                status: "error",
                errorMessage: "UNAUTHORIZED_ACCESS",
                data: null
            }
        }

        const userId = loggedInUser.id;

        const newConvo = await prisma.conversation.create({
            data: {
                userId: userId,
                title: title
            }
        })

        if (!newConvo) {

            return {

                status: "error",
                errorMessage: "CONVERSATION_NOT_ADDED",
                data: null
            }
        }

        //add to redis before returning.

        const cachedConvos = await redis.hget<Conversation[]>(sessionId, "conversationList");

        if (cachedConvos) {

            await redis.hset(sessionId, { conversationList: [...cachedConvos, newConvo] });
        } else {

            await getAllConversations(sessionId);
        }


        return {

            status: "success",
            message: "ADDED_CONVERSATION_TO_RECS",
            data: newConvo
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
