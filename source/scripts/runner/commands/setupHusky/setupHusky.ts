import { $ } from "zx";
import scriptsKeys from "~scripts/build/constants/scriptsKeys/scriptsKeys";
import Programs from "~scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  await $`${Programs.Husky} add .${Programs.Husky}/pre-commit "${Programs.Yarn} run ${scriptsKeys["lint"]} && ${Programs.Yarn} run ${scriptsKeys["test"]}" && ${Programs.Husky} add .${Programs.Husky}/post-merge "${Programs.Yarn}"`;
})();
