import { CronJob } from "cron";
import developerAgent from "../../langchain-agents/developer-agent/developer-agent";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateFrontendGithubRepositoryVectorData: CronJob = new CronJob(
  "42 19 * * *",
  async (): Promise<void> => {
    scanRepositoryToVectorStore({
      collectionName: "zsbrybnik-frontend-repository",
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
