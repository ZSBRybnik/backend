/* eslint-disable max-params */
import { Page } from "@prisma/postgresql";
import { Collection, Insert, Ref } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.add.*", {
  callback: async (_error, { data }) => {
    const { id, ...pageData }: Page = jsonCodec.decode(data) as Page;
    try {
      const mongoDBPromise = mongoDBClient.page.create({
        data: { id, ...pageData },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ id, ...pageData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Insert(Ref(Collection("pages")), 1, "create", {
          data: { cid, id },
        }),
      );
    } catch {
      natsClient.publish(`page.add.${id}`, data);
    }
  },
});
