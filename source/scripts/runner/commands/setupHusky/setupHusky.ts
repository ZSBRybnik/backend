import { $ } from "zx";
import scriptsKeys from "~backend/source/scripts/build/constants/scriptsKeys/scriptsKeys";
import Programs from "~backend/source/scripts/runner/types/programs/programs";
import runtime, { Runtime } from "~backend/source/shared/constants/runtime";

(async (): Promise<void> => {
  await $`${Programs.Husky} add .${Programs.Husky}/pre-commit "${
    runtime === Runtime.Bun ? "bun" : Programs.Yarn
  } run ${scriptsKeys["lint"]} && ${
    runtime === Runtime.Bun ? "bun" : Programs.Yarn
  } run ${scriptsKeys["test"]} && sort-package-json" && ${
    Programs.Husky
  } add .${Programs.Husky}/post-merge "${
    runtime === Runtime.Bun ? "bun install --yarn" : Programs.Yarn
  }"`;
})();
