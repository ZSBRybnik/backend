import { CronJob } from "cron";
import { zsbrybnikBackendCollectionsCollectionName } from "../../constants/vectorDatabaseCollectionsNames/vectorDatabaseCollectionsNames";
import developerAgent from "../../langchain-agents/developer-agent/developer-agent";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateBackendGithubRepositoryVectorData: CronJob = new CronJob(
  "47 19 * * *",
  async (): Promise<void> => {
    await scanRepositoryToVectorStore({
      collectionName: zsbrybnikBackendCollectionsCollectionName,
      repositoryURL: "https://github.com/ZSBRybnik/backend",
    });
    console.log(
      await developerAgent.call({
        input:
          "Wypisz wszystkie pakiety używane w ZSBRybnik/backend, które są powiązane z prisma",
      }),
    );
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateBackendGithubRepositoryVectorData;
