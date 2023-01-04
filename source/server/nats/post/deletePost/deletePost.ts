/* eslint-disable max-params */
import { Post } from "@prisma/postgresql";
import { Delete, Index, Match } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.delete.*", {
  callback: async (_error, { data }) => {
    const { id }: Post = jsonCodec.decode(data) as Post;
    try {
      const mongoDBPromise = mongoDBClient.post.delete({
        where: { id },
      });
      const faunaDBPromise = faunaDBClient.query(
        Delete(Match(Index("posts_by_id"), id)),
      );
      await Promise.all([faunaDBPromise, mongoDBPromise]);
    } catch {
      natsClient.publish(`post.delete.${id}`, data);
    }
  },
});
