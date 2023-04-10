import { CronJob } from "cron";

const updateMainGithubRepositoryVectorData: CronJob = new CronJob(
  "0 12 * * * 1",
  (): void => {
    console.log("You will see this message every second");
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateMainGithubRepositoryVectorData;
