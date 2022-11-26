import { join } from "path";
import { createSchema } from "schemix";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "POSTGRESQL_URL" },
  },
  generator: {
    provider: "prisma-client-js",
    output: "../../../node_modules/@prisma/postgresql",
  },
}).export(join(__dirname, ".."), "postgresql");
