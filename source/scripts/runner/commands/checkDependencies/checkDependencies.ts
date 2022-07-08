import { $ } from "zx";
import source from "~scripts/build/constants/source/source";
import Programs from "~scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  await $`${Programs.NPMCheckUpdates} && cd ./${source}/native-addon-rust && ncu`;
})();
