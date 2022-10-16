/* eslint-disable max-params */
import { Post } from "@prisma/postgresql";
import { Index, Match, Update } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.update.*", {
  callback: async (_error, { data }) => {
    const { id, ...pageData }: Post = jsonCodec.decode(data) as Post;
    try {
      const mongoDBPromise = mongoDBClient.page.update({
        data: { id, ...pageData },
        where: { id },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ id, ...pageData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Update(Match(Index("posts_by_id"), id), {
          data: { cid: cid.toString(), id },
        }),
      );
    } catch {
      natsClient.publish(`post.update.${id}`, data);
    }
  },
});
