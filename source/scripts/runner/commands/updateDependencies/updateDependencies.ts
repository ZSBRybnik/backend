import { $ } from "zx";
import source from "~scripts/build/constants/source/source";

(async () => {
  await $`ncu -u && yarn && cd ./${source}/native-addon-rust && ncu -u && yarn`;
})();
