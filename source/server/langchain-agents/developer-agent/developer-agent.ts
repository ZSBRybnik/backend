import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
  VectorStoreToolkit,
} from "langchain/agents";
import { Chroma } from "langchain/vectorstores/chroma";
import {
  zsbrybnikBackendCollectionsCollectionName,
  zsbrybnikFrontendCollectionsCollectionName,
  zsbrybnikMainRepositoryCollectionName,
} from "~backend/source/server/constants/vectorDatabaseCollectionsNames/vectorDatabaseCollectionsNames";
import openAIClient from "../../clients/openAIClient/openAIClient";
import openAIEmbeddingsClient from "../../clients/openAIEmbeddingsClient/openAIEmbeddingsClient";
import langchainModelTools from "../../constants/langchainModelTools/langchainModelTools";

const vectorStoreMainRepositoryPromise = Chroma.fromExistingCollection(
  openAIEmbeddingsClient,
  {
    collectionName: zsbrybnikMainRepositoryCollectionName,
  },
);

const vectorStoreFrontendRepositoryPromise = Chroma.fromExistingCollection(
  openAIEmbeddingsClient,
  {
    collectionName: zsbrybnikFrontendCollectionsCollectionName,
  },
);

const vectorStoreBackendRepositoryPromise = Chroma.fromExistingCollection(
  openAIEmbeddingsClient,
  {
    collectionName: zsbrybnikBackendCollectionsCollectionName,
  },
);

const [
  vectorStoreMainRepository,
  vectorStoreFrontendRepository,
  vectorStoreBackendRepository,
] = await Promise.all([
  vectorStoreMainRepositoryPromise,
  vectorStoreFrontendRepositoryPromise,
  vectorStoreBackendRepositoryPromise,
]);
await Promise.all([
  vectorStoreMainRepository.ensureCollection(),
  vectorStoreFrontendRepository.ensureCollection(),
  vectorStoreBackendRepository.ensureCollection(),
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

const vectorStoreBackendRepositoryInfo = {
  name: zsbrybnikBackendCollectionsCollectionName,
  description: "zsbrybnik backend repository data",
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

const { tools: backendRepositoryTools } = new VectorStoreToolkit(
  vectorStoreBackendRepositoryInfo,
  openAIClient,
);

const developerAgent: AgentExecutor = await initializeAgentExecutorWithOptions(
  [
    ...frontendRepositoryTools,
    ...mainRepositoryTools,
    ...backendRepositoryTools,
    ...langchainModelTools,
  ],
  openAIClient,
  {
    agentType: "zero-shot-react-description",
  },
);

export default developerAgent;
