import { Page } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const updatePageResolver: ProcedureResolver<
  unknown,
  {
    id: number;
    name: string;
    title: string;
    content: string;
  },
  InferLast<Page | null>
> = ({ input: { id, name, title, content } }) => {
  return postgreSQLClient.page.update({
    where: { id },
    data: { name, title, content },
  });
};

export default updatePageResolver;
