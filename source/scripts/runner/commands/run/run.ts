import { Command } from "commander";
import { platform } from "os";
import { $ } from "zx";
import Programs from "~scripts/runner/types/programs/programs";

type ProgramOptions = {
  target: string;
  device: string;
};

(async (): Promise<void> => {
  const program: Command = new Command();

  program.requiredOption("-t, --target <target>", "Target device");
  program.option("-d, --device <device>", "Specific device");
  program.parse(process.argv);

  const { target, device }: ProgramOptions = program.opts<ProgramOptions>();
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  if (target === "mobile") {
    await $`${Programs.CrossEnvironment} cap run ${device}`;
  } else if (target === "desktop") {
    await $`${Programs.CrossEnvironment} electron .`;
  } else if (target === "web") {
    await $`${Programs.Serve} -s destination`;
  }
})();
