import { existsSync, mkdirSync } from "fs";
import { platform } from "os";
import { join } from "path";
import { $ } from "zx";

const umlFolderPath = join(process.cwd(), "uml");

(async (): Promise<void> => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  const generatePostgreSQLSchemaPromise = $`cross-env TS_NODE_PROJECT=tsconfig.json ts-node ./source/server/prisma/postgresql/index.ts`;
  const generateMongoDBSchemaPromise = $`cross-env TS_NODE_PROJECT=tsconfig.json ts-node ./source/server/prisma/mongodb/index.ts`;
  await Promise.all([
    generatePostgreSQLSchemaPromise,
    generateMongoDBSchemaPromise,
  ]);
  const generatePostgreSQLTypesPromise = $`yarn run generate-postgresql-types`;
  const generateMongoDBTypesPromise = $`yarn run generate-mongodb-types`;
  if (!existsSync(umlFolderPath)) {
    mkdirSync(umlFolderPath);
  }
  const generatePostgreSQLUMLPromise = $`prisma-uml ./source/server/prisma/postgresql.prisma -o png -f ./uml/postgresql.png`;
  const generateMongoSQLUMLPromise = $`prisma-uml ./source/server/prisma/mongodb.prisma -o png -f ./uml/mongodb.png`;
  await Promise.all([
    generatePostgreSQLTypesPromise,
    generateMongoDBTypesPromise,
    generatePostgreSQLUMLPromise,
    generateMongoSQLUMLPromise,
  ]);
})();
