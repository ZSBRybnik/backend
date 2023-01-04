import { $ } from "zx";

(async () => {
  await $`cross-env license-checker --json`;
})();
