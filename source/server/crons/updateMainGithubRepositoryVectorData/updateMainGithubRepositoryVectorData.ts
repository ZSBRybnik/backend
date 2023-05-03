import { CronJob } from "cron";
import scanRepositoryToVectorStore from "../../utils/scanRepositoryToVectorStore/scanRepositoryToVectorStore";

const updateMainGithubRepositoryVectorData: CronJob = new CronJob(
  "42 19 * * *", // 0 12 * * 1
  async (): Promise<void> => {
    scanRepositoryToVectorStore({
      collectionName: "zsbrybnik-main-repository",
      repositoryURL: "https://github.com/ZSBRybnik/ZSB",
    });
    /*console.log(
      await developerAgent.call({
        input:
          "Wypisz użytkowników  wylistowanych w repozytorium ZSB jako CODEOWNERS",
      }),
    );*/
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateMainGithubRepositoryVectorData;
