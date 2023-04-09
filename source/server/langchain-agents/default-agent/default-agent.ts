import { AgentExecutor, initializeAgentExecutor } from "langchain/agents";
import openAIClient from "../../clients/openAIClient/openAIClient";
import langchainModelTools from "../../constants/langchainModelTools/langchainModelTools";

const defaultAgent: AgentExecutor = await initializeAgentExecutor(
  langchainModelTools,
  openAIClient,
  "zero-shot-react-description",
);

export default defaultAgent;
