import { platform } from "os";
import { $ } from "zx";
import destination from "~backend/source/scripts/build/constants/destination/destination";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`rimraf ${destination} && rimraf bundle-analyzes`;
})();
