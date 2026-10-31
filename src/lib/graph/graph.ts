import {ConditionalEdgeRouter, END, START, StateGraph} from "@langchain/langgraph";
import {agentState} from "@/lib/graph/state";
import {graphRouter} from "@/lib/graph/graphRouter";
import {chatAgent} from "@/lib/graph/agents/chatAgent";
import {searchAgent} from "@/lib/graph/agents/searchAgent";
import {codingAgent} from "@/lib/graph/agents/codingAgent";
import {pdfAgent} from "@/lib/graph/agents/pdfAgent";
import {pptAgent} from "@/lib/graph/agents/pptAgent";
import {imageAgent} from "@/lib/graph/agents/imageAgent";
import {AgentNode} from "@/lib/types/ApiResponse";


const workflow = new StateGraph(agentState);

const conditionalEdge: ConditionalEdgeRouter<{InputSchema: typeof agentState, Nodes: AgentNode}> = (state) => {
    return state.agent || "chat";
}

workflow.addNode("graphRouter", graphRouter).addNode("chat", chatAgent).addNode("search", searchAgent).addNode("coding", codingAgent).addNode("pdf", pdfAgent).addNode("ppt", pptAgent).addNode("image", imageAgent)
    .addEdge(START, 'graphRouter').addConditionalEdges("graphRouter", conditionalEdge,
    {
        chat : "chat",
        search: "search",
        pdf: "pdf",
        ppt: "ppt",
        image: "image",
        coding: "coding",

    }).addEdge("search", "chat").addEdge("chat", END).addEdge("coding", END).addEdge("pdf", END).addEdge("ppt", END).addEdge("image", END);

export const graph = workflow.compile();




