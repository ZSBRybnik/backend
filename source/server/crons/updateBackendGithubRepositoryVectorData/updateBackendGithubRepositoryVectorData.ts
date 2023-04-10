import { CronJob } from "cron";

const updateBackendGithubRepositoryVectorData: CronJob = new CronJob(
  "0 14 * * * 1",
  (): void => {
    console.log("You will see this message every second");
  },
  null,
  true,
  "Europe/Warsaw",
);

export default updateBackendGithubRepositoryVectorData;
