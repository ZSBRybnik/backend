import { create } from "ipfs-http-client";

const ipfsClient = await create();

export default ipfsClient;
