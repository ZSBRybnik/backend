import "dotenv/config";
import "source-map-support/register";
import "v8-compile-cache";
import "~backend/source/server/discrod/utils/createClient/createClient";
import serverless from "~backend/source/server/lambdas/index";
import "~backend/source/server/nats/index";
import "~backend/source/server/rest/index";
import target, { TargetType } from "../shared/constants/TargetType";

if (target === TargetType.Server) {
  const createClientPromise = import(
    "~backend/source/server/discrod/utils/createClient/createClient"
  );
  const natsClient = import("~backend/source/server/nats/index");
  const restPromise = import("~backend/source/server/rest/index");
  await Promise.all([createClientPromise, natsClient, restPromise]);
}

export default serverless;
