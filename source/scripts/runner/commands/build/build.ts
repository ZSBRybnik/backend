import { Command } from "commander";
import { platform } from "os";
import { $ } from "zx";
import scriptsKeys from "~scripts/build/constants/scriptsKeys/scriptsKeys";
import source from "~scripts/build/constants/source/source";
import Programs from "~scripts/runner/types/programs/programs";

type BuildFlagsOptions = {
  docker: string;
  target: string;
};

(async (): Promise<void> => {
  const program: Command = new Command();

  program.requiredOption("-t, --target <target>", "Target device");
  program.option("--docker", "Buid with docker");
  program.parse(process.argv);

  const { target, docker }: BuildFlagsOptions = program.opts();
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  if (docker) {
    if (target === "web") {
      await $`${Programs.Docker} build -t web -f ./dockerfiles/web/Dockerfile.web .`;
    }
  } else {
    await $`cd ./${source}/native-addon-go && ${Programs.CrossEnvironment} ${Programs.Yarn} run build && cd .. && cd ..`;
    await $`cd ./${source}/native-addon-rust && ${Programs.CrossEnvironment} ${Programs.Yarn} run build && cd .. && cd ..`;
    await $`${Programs.Yarn} run ${scriptsKeys["remove-build"]} && ${Programs.CrossEnvironment} ${Programs.TypeScriptCompiler} && ${Programs.CrossEnvironment} TS_NODE_PROJECT=tsconfig.json ${Programs.Webpack} --mode production`;
  }
})();
