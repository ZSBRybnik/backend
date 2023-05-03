import { ChromaClient } from "chromadb";

const chromaClient = new ChromaClient();

const collection = await chromaClient.getCollection("zsbrybnik");
console.log(await collection.peek());

//await chromaClient.createCollection("zsbrybnik");

export default chromaClient;
