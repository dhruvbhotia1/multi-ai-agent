import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {ChatGoogle} from "@langchain/google/node";
import {AgentNode} from "@/lib/types/ApiResponse";

const genAI = new ChatGoogleGenerativeAI({
    model: "gemini-3.8-flash",
    temperature: 0,
    maxRetries: 2,
})

const llm = new ChatGoogle({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
    maxRetries: 2,
})

export const getModel = (agent: AgentNode) => {

    switch (agent) {

        case "chat":
            return llm;
        case "search":
            return llm;
        case "coding":
            return genAI;
        default:
            return llm;
    }

}

export type AgentType = typeof genAI | typeof llm;

