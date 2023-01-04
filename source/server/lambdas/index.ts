import serverlessExpress from "@vendia/serverless-express";
import server from "~backend/source/server/rest/index";

const handler = serverlessExpress({
  app: server,
  logSettings: {
    level: process.env.DEVELOPMENT === "true" ? "debug" : "error",
  },
});

export default handler;
