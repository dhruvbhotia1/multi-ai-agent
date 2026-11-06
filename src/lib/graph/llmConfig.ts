import {ChatGroq} from "@langchain/groq";
import {ChatGoogle} from "@langchain/google/node";

const gemini = new ChatGoogle({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-3.7-flash",
})

const groq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",

})

export const getModel = (agent: AgentNode): AIAgentType => {

    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return gemini;
        case "coding":
            return gemini;
        default:
            return groq;
    }
}

export type AIAgentType = typeof groq | typeof gemini;

export type AgentNode = "router" | "chat" | "search" | "coding" | "pdf" | "ppt" | "image";


