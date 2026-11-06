import { type GraphNode} from "@langchain/langgraph";
import {agentState} from "@/lib/graph/state";
import {getModel} from "@/lib/graph/llmConfig";
import {AgentNode} from "@/lib/graph/llmConfig";

export const graphRouter: GraphNode<typeof agentState> = async (state) => {

    const llm = getModel("router");

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
    
    image: 
    Generate image
    Refine image
    edit image
     
    Return ONLY one word: 
    
    chat
    search
    coding
    pdf
    ppt
    image
    
    User Query:
    ${state.prompt}
    `

    const response = await llm.invoke(prompt);

    const agent = response.content.toString().trim().toLowerCase();

    return {

        ...state,
        agent: agent as AgentNode,

    }

}