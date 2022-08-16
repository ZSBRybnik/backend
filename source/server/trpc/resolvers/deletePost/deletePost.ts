import { Post } from "@prisma/client";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";

const deletePost: ProcedureResolver<
  unknown,
  {
    id: number;
  },
  InferLast<Post | null>
> = ({ input: { id } }) => {
  return postgreSQLClient.post.delete({
    where: { id },
  });
};

export default deletePost;
