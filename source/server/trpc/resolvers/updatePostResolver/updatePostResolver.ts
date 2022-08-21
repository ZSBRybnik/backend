import { Post } from "@prisma/client";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";

const updatePostResolver: ProcedureResolver<
  unknown,
  {
    id: number;
    author: string;
    title: string;
    content: string;
    brief: string;
  },
  InferLast<Post | null>
> = ({ input: { id, author, title, content, brief } }) => {
  return postgreSQLClient.post.update({
    where: { id },
    data: { author, title, content, brief },
  });
};

export default updatePostResolver;
