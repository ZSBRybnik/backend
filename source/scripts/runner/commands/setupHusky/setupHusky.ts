import { $ } from "zx";
import scriptsKeys from "~backend/source/scripts/build/constants/scriptsKeys/scriptsKeys";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  await $`${Programs.Husky} add .${Programs.Husky}/pre-commit "${Programs.Yarn} run ${scriptsKeys["lint"]} && ${Programs.Yarn} run ${scriptsKeys["test"]} && sort-package-json" && ${Programs.Husky} add .${Programs.Husky}/post-merge "${Programs.Yarn}"`;
})();
