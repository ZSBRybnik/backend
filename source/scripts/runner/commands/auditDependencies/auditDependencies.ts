import { $ } from "zx";
import Programs from "~backend/source/scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  await $`${Programs.AuditCI} --config audit-ci.json`;
})();
