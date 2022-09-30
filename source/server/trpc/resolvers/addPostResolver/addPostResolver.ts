import { Post } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const addPost: ProcedureResolver<
  unknown,
  {
    authorId: number;
    title: string;
    content: string;
    brief: string;
  },
  InferLast<Post | null>
> = ({ input: { authorId, title, content, brief } }) => {
  return postgreSQLClient.post.create({
    data: { authorId, title, content, brief },
  });
};

export default addPost;
