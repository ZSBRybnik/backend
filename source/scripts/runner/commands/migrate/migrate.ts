import { platform } from "os";
import { $ } from "zx";

(async () => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  const prismaPostgreSQLMigratePromise = $`prisma db push --schema=./source/server/prisma/mongodb.prisma --force-reset`;
  const prismaMongoDBMigratePromise = $`prisma db push --schema=./source/server/prisma/postgresql.prisma --accept-data-loss`;
  const faunaDBMigratePromise = $`cross-env TS_NODE_PROJECT=tsconfig.json ts-node ./source/scripts/runner/commands/migrateFaunaDB/migrateFaunaDB.ts`;
  const chromaDBMigratePromise = $`cross-env TS_NODE_PROJECT=tsconfig.json ts-node ./source/scripts/runner/commands/migrateChromaDB/migrateChromaDB.ts`;
  await Promise.all([
    prismaPostgreSQLMigratePromise,
    prismaMongoDBMigratePromise,
    faunaDBMigratePromise,
    chromaDBMigratePromise,
  ]);
})();
