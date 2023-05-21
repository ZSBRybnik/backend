import { platform } from "os";
import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`${Programs.AuditCI} --config audit-ci.json && osv-scanner -r .`;
})();
