import {Annotation} from "@langchain/langgraph";
import {AgentNode} from "@/lib/graph/llmConfig";

export const agentState = Annotation.Root({
    prompt: Annotation<string>(),
    aiResponse: Annotation<string>(),
    agent: Annotation<AgentNode>()

})

