/* eslint-disable max-params */
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.add", {
  callback: (_error, { data }) => {
    console.log(jsonCodec.decode(data));
  },
});
