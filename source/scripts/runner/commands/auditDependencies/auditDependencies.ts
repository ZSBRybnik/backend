import { $ } from "zx";
import Programs from "~scripts/runner/types/programs/programs";

(async (): Promise<void> => {
  await $`${Programs.AuditCI} --config audit-ci.json`;
})();
