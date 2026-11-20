"use server"

import { ApiResponse, clientSession, user } from "@/lib/types/ApiResponse"
import { SenderRole } from "../../../../generated/prisma/enums"
import { graph } from "../graph"
import { createMessage } from "@/lib/user/conversation/messages/createMessage"

interface Props {

    session: clientSession
    prompt: string,
    conversationId: string,

}

export const AgentController = async ({ prompt, conversationId, session }: Props): Promise<ApiResponse<string>> => {

    try {

        const { user } = session;

        const userMessage = await createMessage("User", prompt, conversationId);

        const result = await graph.invoke({
            prompt,
            conversationId
        });

        const { aiResponse } = result;

        return {

            status: "success",
            message: "response generated succesfully",
            data: aiResponse
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
