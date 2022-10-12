/* eslint-disable max-params */
import { Page } from "@prisma/postgresql";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.add", {
  callback: async (_error, { data }) => {
    try {
      const page: Page = jsonCodec.decode(data) as Page;
      await mongoDBClient.page.create({
        data: page,
      });
      // const ipfsPromise = ipfsClient.add(page);
      // const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      // await faunaDBClient.query(
      //   Insert(Ref(Collection("pages")), 1, "create", {
      //     data: { cid, id: post.id },
      //   }),
      // );
    } catch {
      natsClient.publish("page.add", data);
    }
  },
});
