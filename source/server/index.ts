import { APIGatewayProxyHandler } from "aws-lambda";
import "dotenv/config";
import "source-map-support/register";
import "v8-compile-cache";
import target, { TargetType } from "../shared/constants/TargetType";
import askDeveloperAgent from "./utils/askDeveloperAgent/askDeveloperAgent";

let handler: APIGatewayProxyHandler | undefined;

if (target === TargetType.Server) {
  await askDeveloperAgent({
    prompt: "What is docker? Translate this to polish",
  }),
    await import("./clients/programClient/programClient");
  const createClientPromise = import(
    "~backend/source/server/discord/utils/createClient/createClient"
  );
  const natsClient = import("~backend/source/server/nats/index");
  const restPromise = import("~backend/source/server/rest/index");
  const cronsPromise = import("~backend/source/server/crons");
  await Promise.all([
    createClientPromise,
    natsClient,
    restPromise,
    cronsPromise,
  ]);
} else if (target === TargetType.Serverless) {
  handler = (await import("~backend/source/server/lambdas/index")).default;
}

export default handler;
