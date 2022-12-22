/* eslint-disable max-params */
import { Subpage } from "@prisma/postgresql";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.update.*", {
  callback: async (_error, { data }) => {
    const { name /*...pageData*/ }: Subpage = jsonCodec.decode(data) as Subpage;
    try {
      /*const mongoDBPromise = mongoDBClient.page.update({
        data: { name, ...pageData },
        where: { name },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ name, ...pageData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Update(Match(Index("pages_by_name"), name), {
          data: { cid, name },
        }),
      );*/
      console.log("test");
    } catch {
      natsClient.publish(`page.update.${name}`, data);
    }
  },
});
