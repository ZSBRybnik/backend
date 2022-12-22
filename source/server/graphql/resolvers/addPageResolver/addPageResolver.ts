import { Subpage } from "@prisma/postgresql";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

import createResolver from "../../utils/createResolver/createResolver";

const addPagesResolver = createResolver<
  {
    name: string;
    title: string;
    content: string;
  },
  Record<string, boolean>
>({
  rawResolver: async ({ argument: { name } }): Promise<Partial<Subpage>> => {
    return await postgreSQLClient.subpage.create({
      data: { name /*, title, content */, isDisabled: false },
    });
  },
});

export default addPagesResolver;
