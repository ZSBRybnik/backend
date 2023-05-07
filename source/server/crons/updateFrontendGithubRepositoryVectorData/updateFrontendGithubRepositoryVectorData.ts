import { CronJob } from "cron";
import { zsbrybnikFrontendCollectionsCollectionName } from "../../constants/vectorDatabaseCollectionsNames/vectorDatabaseCollectionsNames";
import developerAgent from "../../langchain-agents/developer-agent/developer-agent";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateFrontendGithubRepositoryVectorData: CronJob = new CronJob(
  "15 20 * * *",
  async (): Promise<void> => {
    await scanRepositoryToVectorStore({
      collectionName: zsbrybnikFrontendCollectionsCollectionName,
      repositoryURL: "https://github.com/ZSBRybnik/frontend",
    });
    console.log(
      await developerAgent.call({
        input:
          "Wypisz wszystkie pakiety używane w ZSB Frontend, które są powiązane z eslintem",
      }),
    );
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateFrontendGithubRepositoryVectorData;
