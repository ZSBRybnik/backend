import { Command } from "commander";
import { platform } from "os";
import { $ } from "zx";
import scriptsKeys from "~backend/source/scripts/build/constants/scriptsKeys/scriptsKeys";
import source from "~backend/source/scripts/build/constants/source/source";
import Programs from "~backend/source/scripts/runner/types/programs/programs";
import runtime, { Runtime } from "~backend/source/shared/constants/runtime";

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
    //if (target === "web") {
    //  await $`${Programs.Docker} build -t web -f ./dockerfiles/web/Dockerfile.web .`;
    //}
  } else {
    const invokeYarnOrBunCommand: string =
      runtime === Runtime.Bun ? "bun" : "yarn";
    const golangBuildPromise = $`cd ./${source}/native-addon-go && ${
      Programs.CrossEnvironment
    } ${invokeYarnOrBunCommand} run ${
      runtime === Runtime.Bun ? "bun-" : ""
    }build && cd .. && cd ..`;
    const rustBuildPromise = $`cd ./${source}/native-addon-rust && ${Programs.CrossEnvironment} ${invokeYarnOrBunCommand} run build && cd .. && cd ..`;
    await Promise.all([golangBuildPromise, rustBuildPromise]);
    await $`${invokeYarnOrBunCommand} run ${scriptsKeys["remove-build"]} && ${Programs.CrossEnvironment} ${Programs.TypeScriptCompiler} --project tsconfig.noemit.json && ${Programs.CrossEnvironment} TS_NODE_PROJECT=tsconfig.node.json ${Programs.Webpack} --mode production --env target=${target}`;
  }
})();
