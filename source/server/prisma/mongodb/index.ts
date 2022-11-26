import { join } from "path";
import { createSchema } from "schemix";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "mongodb",
    url: { env: "MONGODB_URL" },
  },
  generator: {
    provider: "prisma-client-js",
    output: "../../../node_modules/@prisma/mongodb",
  },
}).export(join(__dirname, ".."), "mongodb");
