import { Post } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const updatePostResolver: ProcedureResolver<
  unknown,
  {
    id: number;
    authorId: number;
    title: string;
    brief: string;
  },
  InferLast<Post | null>
> = ({ input: { id, authorId, title, brief } }) => {
  return postgreSQLClient.post.update({
    where: { id },
    data: { authorId, title, brief },
  });
};

export default updatePostResolver;
