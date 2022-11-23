import Surreal from "surrealdb.js";

const surrealDBClient = new Surreal("http://127.0.0.1:8000/rpc");

await surrealDBClient.signin({
  user: "root",
  pass: "root",
});

await surrealDBClient.use("zsbrybnik", "zsbrybnik");

export default surrealDBClient;
