import { platform } from "os";
import { $ } from "zx";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`cross-env TS_NODE_PROJECT=tsconfig.node.json jest --coverage && cross-env TS_NODE_PROJECT=tsconfig.node.json jest --config=jest.integration.config.ts --runInBand --forceExit`;
})();
