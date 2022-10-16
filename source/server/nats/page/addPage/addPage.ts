/* eslint-disable max-params */
import { Page } from "@prisma/postgresql";
import { Collection, Create } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.add.*", {
  callback: async (_error, { data }) => {
    const { id, name, ...pageData }: Page = jsonCodec.decode(data) as Page;
    try {
      const mongoDBPromise = mongoDBClient.page.create({
        data: { id, name, ...pageData },
      });
      const ipfsPromise = ipfsClient.add(
        JSON.stringify({ id, name, ...pageData }),
      );
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Create(Collection("pages"), {
          data: { cid: cid.toString(), name },
        }),
      );
    } catch (error) {
      console.error(error);
      natsClient.publish(`page.add.${id}`, data);
    }
  },
});
