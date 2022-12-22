/* eslint-disable max-params */
import { Post } from "@prisma/postgresql";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.update.*", {
  callback: async (_error, { data }) => {
    const { id /*...pageData*/ }: Post = jsonCodec.decode(data) as Post;
    try {
      /*const mongoDBPromise = mongoDBClient.post.update({
        data: { id, ...pageData },
        where: { id },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ id, ...pageData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Update(Match(Index("posts_by_id"), id), {
          data: { cid: cid.toString(), id },
        }),
      );*/
      console.log("test");
    } catch {
      natsClient.publish(`post.update.${id}`, data);
    }
  },
});
