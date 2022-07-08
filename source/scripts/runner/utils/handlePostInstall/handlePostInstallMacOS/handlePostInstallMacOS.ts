import commandExists from "command-exists";
import { $ } from "zx";
import Programs from "~scripts/runner/types/programs/programs";

const handlePostInstallMacOS = async () => {
  try {
    await commandExists(Programs.Brew);
  } catch {
    await $`Set-/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  }
  try {
    await commandExists(Programs.Pulumi);
  } catch {
    await $`${Programs.Brew} install pulumi`;
  }
};

export default handlePostInstallMacOS;
