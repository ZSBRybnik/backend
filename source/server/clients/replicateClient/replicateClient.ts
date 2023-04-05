import Replicate from "replicate";

const replicateClient = new Replicate({
  auth: process.env.REPLICATE_TOKEN || "",
});

export default replicateClient;
