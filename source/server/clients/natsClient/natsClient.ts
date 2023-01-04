import { connect, JSONCodec, NatsConnection } from "nats";

export const jsonCodec = JSONCodec();

const natsClient: NatsConnection = await connect({
  servers: "localhost:4222",
});

export default natsClient;
