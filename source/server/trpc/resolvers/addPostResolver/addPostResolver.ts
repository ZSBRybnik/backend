import { Post, PostContentItem } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const addPost: ProcedureResolver<
  unknown,
  {
    authorId: number;
    title: string;
    brief: string;
    content: PostContentItem[];
  },
  InferLast<Post | null>
> = async ({ input: { authorId, title, brief, content } }) => {
  const { id, ...postData } = await postgreSQLClient.post.create({
    data: {
      authorId,
      title,
      brief,
      content: { createMany: { data: content } },
    },
  });
  natsClient.publish(`post.add.${id}`, jsonCodec.encode({ id, ...postData }));
  return { id, ...postData };
};

export default addPost;
