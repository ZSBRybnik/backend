import { join } from "path";
import { createSchema } from "schemix";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "POSTGRESQL_URL" },
    /*extensions: generatePrismaString({
      rawString: `#prisma
        [pg_tgrm, zombodb]
      `,
    }),*/
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js",
      output: "../../../node_modules/@prisma/postgresql",
      // previewFeatures: ["postgresqlExtensions"],
    },
    {
      name: "tables",
      provider: "node node_modules/prisma-enum-generator",
      output: "../../../node_modules/@prisma/postgresql-tables",
    },
    {
      name: "dbml",
      provider: "prisma-dbml-generator",
      outputName: "postgresql.dbml",
      output: "../../../uml",
    },
    {
      name: "json",
      provider: "prisma-json-schema-generator",
      output: "../../../uml/postgresql",
    },
  ],
}).export(join(__dirname, ".."), "postgresql");
