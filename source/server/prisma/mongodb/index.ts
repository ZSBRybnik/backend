import { join } from "path";
import { createSchema } from "schemix";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "mongodb",
    url: { env: "MONGODB_URL" },
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js",
      output: "../../../node_modules/@prisma/mongodb",
    },
    {
      name: "tables",
      provider: "node node_modules/prisma-enum-generator",
      output: "../../../node_modules/@prisma/mongodb-tables",
    },
    /*{
      name: "dbml",
      provider: "prisma-dbml-generator",
      outputName: "mongodb.dbml",
      output: "../../../uml",
    },*/
    {
      name: "json",
      provider: "prisma-json-schema-generator",
      output: "../../../uml/mongodb",
    },
  ],
}).export(join(__dirname, ".."), "mongodb");
