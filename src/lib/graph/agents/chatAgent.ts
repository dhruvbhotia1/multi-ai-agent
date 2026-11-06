import {type GraphNode} from "@langchain/langgraph";
import {agentState} from "@/lib/graph/state";
import {getModel} from "@/lib/graph/llmConfig";

export const chatAgent: GraphNode<typeof agentState> = async (state) => {

    const llm = getModel("chat");

    const systemPrompt = `
    You are VortextAI, an intelligent AI assistant.
    
    `

    const result = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt,
        },

        {
            "role": "human",
            "content": state.prompt,
        }
    ]);



    return {
        ...state,
        aiResponse: result.content.toString(),
    }

}