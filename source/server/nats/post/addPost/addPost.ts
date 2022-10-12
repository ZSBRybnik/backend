/* eslint-disable max-params */
import { Post } from "@prisma/postgresql";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.add.*", {
  callback: async (_error, { data }) => {
    try {
      const post: Post = jsonCodec.decode(data) as Post;
      await mongoDBClient.post.create({
        data: post,
      });
      // const ipfsPromise = ipfsClient.add(post);
      // const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      // await faunaDBClient.query(
      //   Insert(Ref(Collection("posts")), 1, "create", {
      //     data: { cid, id: post.id },
      //   }),
      // );
    } catch {
      natsClient.publish("post.add", data);
    }
  },
});
