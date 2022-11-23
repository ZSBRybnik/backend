import { platform } from "os";
import { $ } from "zx";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  await $`prisma db push --schema=./source/server/prisma/mongodb.prisma --force-reset && prisma db push --schema=./source/server/prisma/postgresql.prisma --accept-data-loss`;
})();
