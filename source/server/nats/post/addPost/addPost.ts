/* eslint-disable max-params */
import { Post, PostContentItem } from "@prisma/postgresql";
import { Collection, Create } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

type PostWithContent = Post & {
  content: PostContentItem[];
};

natsClient.subscribe("post.add.*", {
  callback: async (_error, { data }) => {
    const { id, ...postData }: PostWithContent = jsonCodec.decode(
      data,
    ) as PostWithContent;
    try {
      const mongoDBPromise = mongoDBClient.post.create({
        data: { id, ...postData },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ id, ...postData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Create(Collection("posts"), {
          data: { cid: cid.toString(), id },
        }),
      );
    } catch (error) {
      natsClient.publish(`post.add.${id}`, data);
    }
  },
});
