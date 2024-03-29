import { Command } from "commander";
import { platform } from "os";
import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";
import runtime, { Runtime } from "~backend/source/shared/constants/runtime";

(async (): Promise<void> => {
  const program: Command = new Command();

  program.requiredOption("-t, --target <target>", "Target device");
  program.option("-d, --device <device>", "Specific device");
  program.parse(process.argv);
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`${Programs.CrossEnvironment} ${
    runtime === Runtime.Bun ? "bun" : "node"
  } ./destination/source/index.js`;
})();
