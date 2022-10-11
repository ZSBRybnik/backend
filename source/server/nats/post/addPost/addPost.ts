/* eslint-disable max-params */
import { JSONCodec } from "nats";
import natsClient from "~backend/source/server/clients/natsClient/natsClient";

const jsonCodec = JSONCodec();

natsClient.subscribe("add-post", {
  callback: (_error, { data }) => {
    console.log(jsonCodec.decode(data));
  },
});
