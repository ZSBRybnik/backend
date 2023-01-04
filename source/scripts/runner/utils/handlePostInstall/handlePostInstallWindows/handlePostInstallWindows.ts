import commandExists from "command-exists";
import { stat, symlink } from "fs/promises";
import { join } from "path";
import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

const documentationPath = join(process.cwd(), "documentation");

const handlePostInstallWindows = async () => {
  /*try {
    await commandExists(Programs.nodeVersionManager);
  } catch {
    await $`sudo npm install -g n`;
  }*/
  /*try {
    await commandExists(Programs.node);
    const nodeVersion = await $`node -v`;
  } catch (err) {
    await $`sudo npm install -g n`;
  }*/
  $.prefix = "";
  try {
    await commandExists(Programs.Choco);
  } catch {
    $.shell = "powershell";
    await $`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`;
  }
  try {
    await commandExists(Programs.Gcc);
  } catch {
    $.shell = "powershell";
    await $`start-process -filepath ${Programs.Choco} "install ${Programs.CppCompiler} -y" -verb runas`;
  }
  try {
    await commandExists(Programs.Pulumi);
  } catch {
    $.shell = "powershell";
    await $`start-process -filepath ${Programs.Choco} "install ${Programs.Pulumi} -y" -verb runas`;
  }
  try {
    await stat(join(documentationPath, "src"));
  } catch (error) {
    await symlink(
      join(documentationPath, "source"),
      join(documentationPath, "src"),
      "dir",
    );
  }
};

export default handlePostInstallWindows;
