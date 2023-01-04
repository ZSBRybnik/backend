import commandExists from "command-exists";
import { platform } from "os";
import { $ } from "zx";

(async () => {
  const os: NodeJS.Platform = platform();

  if (os === "darwin") {
    try {
      await commandExists("brew");
    } catch {
      await $`Set-/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
    }
    try {
      await commandExists("rustc");
    } catch {
      await $`brew install rust`;
    }
  }
})();
