/* eslint-disable max-params */
import { Page } from "@prisma/postgresql";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.add.*", {
  callback: async (_error, { data }) => {
    const { id, ...pageData }: Page = jsonCodec.decode(data) as Page;

    try {
      await mongoDBClient.page.create({
        data: { id, ...pageData },
      });
      // const ipfsPromise = ipfsClient.add(page);
      // const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      // await faunaDBClient.query(
      //   Insert(Ref(Collection("pages")), 1, "create", {
      //     data: { cid, id: post.id },
      //   }),
      // );
    } catch {
      natsClient.publish(`page.add.${id}`, data);
    }
  },
});
