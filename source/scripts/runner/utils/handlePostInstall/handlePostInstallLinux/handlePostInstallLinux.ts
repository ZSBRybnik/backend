import commandExists from "command-exists";
import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

const handlePostInstallLinux = async () => {
  try {
    await commandExists(Programs.Pulumi);
  } catch {
    await $`curl -fsSL https://get.pulumi.com | sh`;
  }
  try {
    await commandExists(Programs.RustCompiler);
  } catch {
    await $`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`;
  }
  // try {
  //   await commandExists("cloud-nuke");
  // } catch {
  //   await $`${Programs.Brew} install cloud-nuke`;
  // }
};

export default handlePostInstallLinux;
