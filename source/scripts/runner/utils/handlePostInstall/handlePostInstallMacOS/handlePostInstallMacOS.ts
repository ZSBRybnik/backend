import commandExists from "command-exists";
import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

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
  try {
    await commandExists("cloud-nuke");
  } catch {
    await $`${Programs.Brew} install cloud-nuke`;
  }
  try {
    await $`pod search ${Programs.Cocoapods}`;
  } catch {
    await $`sudo gem install ${Programs.Cocoapods}`;
  }
};

export default handlePostInstallMacOS;
