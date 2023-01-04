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
  rawResolver: async ({
    argument: { name /*title, content*/ },
  }): Promise<Partial<Subpage>> => {
    return await postgreSQLClient.subpage.create({
      data: { name, isDisabled: false /*title, content*/ },
    });
  },
});

export default addPagesResolver;
