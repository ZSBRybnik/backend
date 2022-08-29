import { Page } from "@prisma/client";
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
    argument: { name, title, content },
  }): Promise<Partial<Page>> => {
    return await postgreSQLClient.page.create({
      data: { name, title, content },
    });
  },
});

export default addPagesResolver;
