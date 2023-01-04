import { platform } from "os";
import { $ } from "zx";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`cross-env TS_NODE_PROJECT=tsconfig.json jest --coverage`;
})();
