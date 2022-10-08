import { platform } from "os";
import { $ } from "zx";
import handlePostInstallLinux from "~backend/source/scripts/runner/utils/handlePostInstall/handlePostInstallLinux/handlePostInstallLinux";
import handlePostInstallMacOS from "~backend/source/scripts/runner/utils/handlePostInstall/handlePostInstallMacOS/handlePostInstallMacOS";
import handlePostInstallWindows from "~backend/source/scripts/runner/utils/handlePostInstall/handlePostInstallWindows/handlePostInstallWindows";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`husky install && yarn run generate-postgresql-types && yarn run generate-mongodb-types`;
  if (os === "win32") {
    await handlePostInstallWindows();
  } else if (os === "darwin") {
    await handlePostInstallMacOS();
  } else {
    await handlePostInstallLinux();
  }
})();
