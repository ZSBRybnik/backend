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
    collectionName: "zsbrybnik",
    // url: "http://chromadb:8000",
  },
);

await vectorStore.ensureCollection();

const vectorStoreInfo = {
  name: "zsbrybnik",
  description: "zsbrybnik data",
  vectorStore,
};

const { tools } = new VectorStoreToolkit(vectorStoreInfo, openAIClient);

const developerAgent: AgentExecutor = await initializeAgentExecutor(
  [...tools, ...langchainModelTools],
  openAIClient,
  "zero-shot-react-description",
);

export default developerAgent;
