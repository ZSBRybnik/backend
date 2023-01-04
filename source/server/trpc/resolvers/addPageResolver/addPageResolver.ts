import { Subpage } from "@prisma/postgresql";
import { InferLast } from "@trpc/server";
import { ProcedureResolver } from "@trpc/server/dist/declarations/src/internals/procedure";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

const addPage: ProcedureResolver<
  unknown,
  {
    name: string;
    title: string;
    category: string;
  },
  InferLast<Subpage | null>
> = ({ input: { name /*itle, category */ } }) => {
  return postgreSQLClient.subpage.create({
    data: { name, isDisabled: false /*, title, category*/ },
  });
};

export default addPage;
