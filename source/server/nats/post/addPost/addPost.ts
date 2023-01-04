/* eslint-disable max-params */
import { ContentItem, Post } from "@prisma/postgresql";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

type PostWithContent = Post & {
  content: ContentItem[];
};

natsClient.subscribe("post.add.*", {
  callback: async (_error, { data }) => {
    const { id /*...postData*/ }: PostWithContent = jsonCodec.decode(
      data,
    ) as PostWithContent;
    try {
      /*const mongoDBPromise = mongoDBClient.post.create({
        data: { id, ...postData },
      });
      const ipfsPromise = ipfsClient.add(JSON.stringify({ id, ...postData }));
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Create(Collection("posts"), {
          data: { cid: cid.toString(), id },
        }),
      );*/
      console.log("test");
    } catch (error) {
      natsClient.publish(`post.add.${id}`, data);
    }
  },
});
