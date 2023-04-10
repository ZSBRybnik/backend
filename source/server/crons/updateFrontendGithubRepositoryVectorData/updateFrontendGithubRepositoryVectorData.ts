import { CronJob } from "cron";

const updateFrontendGithubRepositoryVectorData: CronJob = new CronJob(
  "0 13 * * * 1",
  (): void => {
    console.log("You will see this message every second");
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateFrontendGithubRepositoryVectorData;
