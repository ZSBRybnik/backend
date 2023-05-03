import {
  AgentExecutor,
  initializeAgentExecutor,
  VectorStoreToolkit,
} from "langchain/agents";
import { Chroma } from "langchain/vectorstores/chroma";
import openAIClient from "../../clients/openAIClient/openAIClient";
import openAIEmbeddingsClient from "../../clients/openAIEmbeddingsClient/openAIEmbeddingsClient";
import langchainModelTools from "../../constants/langchainModelTools/langchainModelTools";

const vectorStoreMainRepositoryPromise = Chroma.fromExistingCollection(
  openAIEmbeddingsClient,
  {
    collectionName: "zsbrybnik-main-repository",
  },
);

const vectorStoreFrontendRepositoryPromise = Chroma.fromExistingCollection(
  openAIEmbeddingsClient,
  {
    collectionName: "zsbrybnik-frontend-repository",
  },
);

const [vectorStoreMainRepository, vectorStoreFrontendRepository] =
  await Promise.all([
    vectorStoreMainRepositoryPromise,
    vectorStoreFrontendRepositoryPromise,
  ]);
Promise.all([
  vectorStoreMainRepository.ensureCollection(),
  vectorStoreFrontendRepository.ensureCollection(),
]);

const vectorStoreMainRepositoryInfo = {
  name: "zsbrybnik-main-repository",
  description: "zsbrybnik main repository data",
  vectorStore: vectorStoreMainRepository,
};

const vectorStoreFrontendRepositoryInfo = {
  name: "zsbrybnik-frontend-repository",
  description: "zsbrybnik frontend repository data",
  vectorStore: vectorStoreFrontendRepository,
};

const { tools: mainRepositoryTools } = new VectorStoreToolkit(
  vectorStoreMainRepositoryInfo,
  openAIClient,
);

const { tools: frontendRepositoryTools } = new VectorStoreToolkit(
  vectorStoreFrontendRepositoryInfo,
  openAIClient,
);

const developerAgent: AgentExecutor = await initializeAgentExecutor(
  [...mainRepositoryTools, ...frontendRepositoryTools, ...langchainModelTools],
  openAIClient,
  "zero-shot-react-description",
);

export default developerAgent;
