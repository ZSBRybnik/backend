import { Command } from "commander";
import nodemon from "nodemon";
import { platform } from "os";
import { $ } from "zx";
import source from "~scripts/build/constants/source/source";

(async () => {
  const program = new Command();

  program.requiredOption("-t, --target <target>", "Target device");
  program.option("-d, --device <device>", "Specific device");
  program.option("--docker", "Buid with docker");
  program.parse(process.argv);

  const { target, device, docker } = program.opts();

  const os: NodeJS.Platform = platform();
  if (docker) {
    if (target === "web") {
      await $`docker build -t web -f ./dockerfiles/web/Dockerfile.web.dev .`;
    }
  } else {
    if (os === "win32") {
      $.shell = "cmd";
      $.prefix = "";
    }
    const developmentServer = $`yarn run remove-build && cross-env tsc && cross-env TS_NODE_PROJECT=tsconfig.node.json webpack serve --config webpack.config.ts --env target=${target} --mode development`;
    let mobileLiveReload;
    if (target === "mobile") {
      setTimeout(() => {
        mobileLiveReload = $`cross-env DEVELOPMENT=true cap run ${device} --livereload --external`;
      }, 30_000);
    } else if (target === "desktop") {
      nodemon({
        ext: "js jsx ts tsx json",
        watch: [
          `./${source}/shared`,
          `./${source}/main`,
          `./${source}/preload`,
          `./${source}/native-addon-go`,
          `./${source}/native-addon-rust`,
        ],
        exec: "yarn run build-desktop && yarn run run-desktop",
      });
    }
    Promise.all([developmentServer, mobileLiveReload]);
  }
})();
