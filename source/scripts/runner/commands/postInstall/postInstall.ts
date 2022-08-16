import { platform } from "os";
import { $ } from "zx";
import handlePostInstallLinux from "~scripts/runner/utils/handlePostInstall/handlePostInstallLinux/handlePostInstallLinux";
import handlePostInstallMacOS from "~scripts/runner/utils/handlePostInstall/handlePostInstallMacOS/handlePostInstallMacOS";
import handlePostInstallWindows from "~scripts/runner/utils/handlePostInstall/handlePostInstallWindows/handlePostInstallWindows";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`husky install`;
  if (os === "win32") {
    await handlePostInstallWindows();
  } else if (os === "darwin") {
    await handlePostInstallMacOS();
  } else {
    await handlePostInstallLinux();
  }
})();
