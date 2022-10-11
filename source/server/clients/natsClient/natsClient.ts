import { connect, JSONCodec } from "nats";

export const jsonCodec = JSONCodec();

const natsClient = await connect({
  servers: "localhost:4442",
});

export default natsClient;
