import {StateGraph} from "@langchain/langgraph";
import {agentState} from "@/lib/graph/state";
import {graphRouter} from "@/lib/graph/graphRouter";
import {chatAgent} from "@/lib/graph/agents/chatAgent";
import {searchAgent} from "@/lib/graph/agents/searchAgent";
import {codingAgent} from "@/lib/graph/agents/codingAgent";
import {pdfAgent} from "@/lib/graph/agents/pdfAgent";
import {pptAgent} from "@/lib/graph/agents/pptAgent";
import {imageAgent} from "@/lib/graph/agents/imageAgent";


const workflow = new StateGraph(agentState);

workflow.addNode("graphRouter", graphRouter)
workflow.addNode("chat", chatAgent)
workflow.addNode("search", searchAgent)
workflow.addNode("coding", codingAgent)
workflow.addNode("pdf", pdfAgent)
workflow.addNode("ppt", pptAgent)
workflow.addNode("image", imageAgent)

workflow.addEdge("__start__", "graphRouter")
workflow.addConditionalEdges("router", )

