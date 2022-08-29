import { Page } from "@prisma/client";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const addPage: ProcedureResolver<
  unknown,
  {
    name: string;
    title: string;
    content: string;
  },
  InferLast<Page | null>
> = ({ input: { name, title, content } }) => {
  return postgreSQLClient.page.create({
    data: { name, title, content },
  });
};

export default addPage;
