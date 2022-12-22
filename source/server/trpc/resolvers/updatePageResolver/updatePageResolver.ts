import { Subpage } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const updatePageResolver: ProcedureResolver<
  unknown,
  {
    id: number;
    name: string;
    title: string;
    category: string;
  },
  InferLast<Subpage | null>
> = ({ input: { name /*title, category*/ } }) => {
  return postgreSQLClient.subpage.update({
    where: { name },
    data: { name /*title, category*/ },
  });
};

export default updatePageResolver;
