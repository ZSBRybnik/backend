import { Document as LangchainDocument } from "langchain/dist/document";
import { GithubRepoLoader } from "langchain/document_loaders";
import { Chroma } from "langchain/vectorstores/chroma";
import openAIEmbeddingsClient from "../../clients/openAIEmbeddingsClient/openAIEmbeddingsClient";

type ScanRepositoryToVectorStoreArguments = {
  collectionName: string;
  repositoryURL: string;
};

const scanRepositoryToVectorStore = async ({
  collectionName,
  repositoryURL,
}: ScanRepositoryToVectorStoreArguments): Promise<
  LangchainDocument<Record<string, any>>[]
> => {
  const githubRepositoryVectorDataLoader = new GithubRepoLoader(repositoryURL, {
    branch: "master",
    recursive: true,
    unknown: "warn",
  });
  const documents: LangchainDocument<Record<string, any>>[] =
    await githubRepositoryVectorDataLoader.load();
  /*console.log(rawDocuments);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const documents = await textSplitter.splitDocuments(rawDocuments);
  console.log(documents);*/

  await Chroma.fromDocuments(documents, openAIEmbeddingsClient, {
    collectionName,
  });
  return documents;
};

export default scanRepositoryToVectorStore;
