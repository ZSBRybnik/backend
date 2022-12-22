/* eslint-disable max-params */
import { Subpage } from "@prisma/postgresql";
import { Collection, Create } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.add.*", {
  callback: async (_error, { data }) => {
    const { name, ...pageData }: Subpage = jsonCodec.decode(data) as Subpage;
    try {
      /* const mongoDBPromise = mongoDBClient.page.create({
        data: { name, content: { createMany: { data: content } }, ...pageData },
      });*/
      const ipfsPromise = ipfsClient.add(JSON.stringify({ name, ...pageData }));
      const [{ cid }] = await Promise.all([ipfsPromise /*mongoDBPromise*/]);
      await faunaDBClient.query(
        Create(Collection("pages"), {
          data: { cid: cid.toString(), name },
        }),
      );
    } catch (error) {
      console.error(error);
      natsClient.publish(`page.add.${name}`, data);
    }
  },
});
