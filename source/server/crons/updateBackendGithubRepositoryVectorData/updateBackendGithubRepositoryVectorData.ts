import { CronJob } from "cron";
import developerAgent from "../../langchain-agents/developer-agent/developer-agent";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateBackendGithubRepositoryVectorData: CronJob = new CronJob(
  "42 19 * * *",
  async (): Promise<void> => {
    scanRepositoryToVectorStore({
      collectionName: "zsbrybnik-backend-repository",
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
