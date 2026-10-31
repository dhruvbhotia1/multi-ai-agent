import { type GraphNode} from "@langchain/langgraph";
import {agentState} from "@/lib/graph/state";
import {AgentType, getModel} from "@/lib/graph/llmConfig";


export const graphRouter: GraphNode<typeof agentState> = async (state) => {

    const llm: AgentType = getModel(state.agent);

    const prompt = `You are an agent router.
    Available agents: 
    
    -chat
    -search
    -coding
    -pdf
    -ppt
    -image
    
    Rules: 
    
    chat: 
    General Conversation,
    explanations,
    learning,
    questions.
    
    search: 
    Current events,
    lastest information,
    news,
    recent developments,
    internet lookup.
    
    coding:
    Generate code,
    debug code,
    build projects,
    architecture
    API design.
    
    pdf:
    Question about generate PDFs
    or document context.
    
    ppt:
    Questions about generate ppts
    or ppt context.
    
    Return ONLY one word: 
    
    chat
    search
    coding
    pdf
    
    User Query:
    `





    return {

        prompt: prompt as string,
        aiResponse: state.aiResponse,
        agent: "chat"

    }

}