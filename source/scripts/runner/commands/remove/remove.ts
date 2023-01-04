import { Command } from "commander";
import { platform } from "os";
import { $ } from "zx";

(async (): Promise<void> => {
  const program = new Command();

  program.requiredOption("-t, --target <target>", "Target device");
  program.option("-d, --device <device>", "Specific device");
  program.parse(process.argv);

  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
})();
