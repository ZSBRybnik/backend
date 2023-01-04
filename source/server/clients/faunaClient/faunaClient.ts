import "dotenv/config";
import { Client } from "faunadb";

const faunaDBClient = new Client({
  secret: process.env.FAUNADB_KEY || "",
});

export default faunaDBClient;
