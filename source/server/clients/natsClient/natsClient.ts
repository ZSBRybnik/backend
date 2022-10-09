import { connect } from "nats";

const natsClient = await connect({
  servers: "localhost:4442",
});

export default natsClient;
