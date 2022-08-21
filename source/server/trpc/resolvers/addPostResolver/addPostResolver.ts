import { Post } from "@prisma/client";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";

const addPost: ProcedureResolver<
  unknown,
  {
    author: string;
    title: string;
    content: string;
    brief: string;
  },
  InferLast<Post | null>
> = ({ input: { author, title, content, brief } }) => {
  return postgreSQLClient.post.create({
    data: { author, title, content, brief },
  });
};

export default addPost;
