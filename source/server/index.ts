import { APIGatewayProxyHandler } from "aws-lambda";
import "dotenv/config";
import "source-map-support/register";
import "v8-compile-cache";
import "~backend/source/server/discrod/utils/createClient/createClient";
import "~backend/source/server/nats/index";
import "~backend/source/server/rest/index";
import target, { TargetType } from "../shared/constants/TargetType";

let handler: APIGatewayProxyHandler | undefined;

if (target === TargetType.Server) {
  const createClientPromise = import(
    "~backend/source/server/discrod/utils/createClient/createClient"
  );
  const natsClient = import("~backend/source/server/nats/index");
  const restPromise = import("~backend/source/server/rest/index");
  await Promise.all([createClientPromise, natsClient, restPromise]);
} else if (target === TargetType.Serverless) {
  handler = (await import("~backend/source/server/lambdas/index")).default;
}

export default handler;
