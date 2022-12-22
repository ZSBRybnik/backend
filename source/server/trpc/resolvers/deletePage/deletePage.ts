import { Subpage } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const deletePage: ProcedureResolver<
  unknown,
  {
    name: string;
  },
  InferLast<Subpage | null>
> = ({ input: { name } }) => {
  return postgreSQLClient.subpage.delete({
    where: { name },
  });
};

export default deletePage;
