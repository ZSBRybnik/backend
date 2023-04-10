import weaviate, { WeaviateClient } from "weaviate-ts-client";

const weaviateClient: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "",
});

export default weaviateClient;
