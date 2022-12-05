import { join } from "path";
import { createSchema } from "schemix";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "POSTGRESQL_URL" },
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js",
      output: "../../../node_modules/@prisma/postgresql",
    },
    {
      name: "tables",
      provider: "node node_modules/prisma-enum-generator",
      output: "../../../node_modules/@prisma/postgresql-tables",
    },
  ],
}).export(join(__dirname, ".."), "postgresql");
