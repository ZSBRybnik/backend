import { CronJob } from "cron";
import { zsbrybnikMainRepositoryCollectionName } from "../../constants/vectorDatabaseCollectionsNames/vectorDatabaseCollectionsNames";
import developerAgent from "../../langchain-agents/developer-agent/developer-agent";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateMainGithubRepositoryVectorData: CronJob = new CronJob(
  "11 20 * * *", // 0 12 * * 1
  async (): Promise<void> => {
    await scanRepositoryToVectorStore({
      collectionName: zsbrybnikMainRepositoryCollectionName,
      repositoryURL: "https://github.com/ZSBRybnik/ZSB",
    });
    console.log(
      await developerAgent.call({
        input:
          "Wypisz użytkowników  wylistowanych w repozytorium ZSB jako CODEOWNERS",
      }),
    );
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateMainGithubRepositoryVectorData;
