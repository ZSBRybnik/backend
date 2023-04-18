import { CronJob } from "cron";

const updateMainGithubRepositoryVectorData: CronJob = new CronJob(
  "38 21 * * 2", // 0 12 * * 1
  async (): Promise<void> => {
    console.log("dziala");

    /*const githubRepositoryVectorDataLoader = new GithubRepoLoader(
      "https://github.com/ZSBRybnik/ZSB",
      { branch: "master", recursive: true, unknown: "warn" },
    );
    const documents = await githubRepositoryVectorDataLoader.load();
    await Chroma.fromDocuments(documents, new OpenAIEmbeddings(), {
      collectionName: "ZSBRybnik",
    });*/
    const developerAgent: any = await import(
      "../../langchain-agents/developer-agent/developer-agent"
    );
    console.log(
      (
        await developerAgent.call({
          value:
            "Wypisz użytkowników  wylistowanych w repozytorium ZSB jako CODEOWNERS",
        })
      ).default,
    );
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateMainGithubRepositoryVectorData;
