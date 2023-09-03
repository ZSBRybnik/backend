// import { createPrismaSchemaBuilder, printSchema } from "@mrleebo/prisma-ast";
import { existsSync, mkdirSync } from "fs";
import { platform } from "os";
import { join } from "path";
import { $ } from "zx";
import runtime, { Runtime } from "~backend/source/shared/constants/runtime";

const umlFolderPath = join(process.cwd(), "uml");

(async (): Promise<void> => {
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  const invokeTsNodeOrBunCommand: string =
    runtime === Runtime.Bun
      ? "bun"
      : "TS_NODE_PROJECT=tsconfig.node.json ts-node";
  const invokeYarnOrBunCommand: string =
    runtime === Runtime.Bun ? "bun" : "yarn";
  const generatePostgreSQLSchemaPromise = $`cross-env ${invokeTsNodeOrBunCommand} ./source/server/prisma/postgresql/index.ts`;
  const generateMongoDBSchemaPromise = $`cross-env ${invokeTsNodeOrBunCommand} ./source/server/prisma/mongodb/index.ts`;
  await Promise.all([
    generatePostgreSQLSchemaPromise,
    generateMongoDBSchemaPromise,
  ]);
  /*const postgreSQLSchemaContent = readFileSync(
    join(process.cwd(), "source", "server", "prisma", "postgresql.prisma"),
    "utf-8",
  ).toString();
  const postgreSQLSchemaBuilder = createPrismaSchemaBuilder(
    postgreSQLSchemaContent,
  );
  const { type, list } = postgreSQLSchemaBuilder.getSchema();
  const fixedSchema = {
    type,
    list: list.map((schemaElement) => {
      const { name, assignments }: any = schemaElement;
      if (name === "database") {
        return {
          ...schemaElement,
          assignments: [
            ...assignments,
            {
              type: "assignment",
              key: "extensions",
              value: "[zombodb, pg_tgrm]",
            },
          ],
        };
      }
      return schemaElement;
    }),
  };
  const postgreSQLSchema = printSchema(fixedSchema);
  writeFileSync(
    join(process.cwd(), "source", "server", "prisma", "postgresql.prisma"),
    postgreSQLSchema,
    "utf-8",
  );*/
  /** These commands can't be split, because they are blocking access to prisma engine in the file system */
  await $`${invokeYarnOrBunCommand} run generate-postgresql-types && ${invokeYarnOrBunCommand} run generate-mongodb-types`;
  if (!existsSync(umlFolderPath)) {
    mkdirSync(umlFolderPath);
  }
  const generatePostgreSQLUMLPromise = $`prisma-uml ./source/server/prisma/postgresql.prisma -o png -f ./uml/postgresql.png`;
  const generateMongoSQLUMLPromise = $`prisma-uml ./source/server/prisma/mongodb.prisma -o png -f ./uml/mongodb.png`;
  await Promise.all([generatePostgreSQLUMLPromise, generateMongoSQLUMLPromise]);
})();
