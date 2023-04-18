import {
  AgentExecutor,
  initializeAgentExecutor,
  VectorStoreToolkit,
} from "langchain/agents";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import openAIClient from "../../clients/openAIClient/openAIClient";
import langchainModelTools from "../../constants/langchainModelTools/langchainModelTools";

const vectorStore = await Chroma.fromExistingCollection(
  new OpenAIEmbeddings(),
  {
    collectionName: "ZSBRybnik",
  },
);

const vectorStoreInfo = {
  name: "ZSBRybnik",
  description: "ZSBRybnik data",
  vectorStore,
};

const { tools } = new VectorStoreToolkit(vectorStoreInfo, openAIClient);

const developerAgent: AgentExecutor = await initializeAgentExecutor(
  [...tools, ...langchainModelTools],
  openAIClient,
  "zero-shot-react-description",
);

export default developerAgent;
