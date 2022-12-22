import { ContentItem } from "@prisma/postgresql";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const addPagesResolver = createResolver<
  {
    name: string;
    title: string;
    category: string;
    content: Omit<ContentItem, "id">[];
  },
  Record<string, boolean>
>({
  // tslint:disable-next-line: typedef
  rawResolver: async ({ argument: { name /* title, category, content*/ } }) => {
    return await postgreSQLClient.subpage.create({
      data: {
        name,
        isDisabled: false,
        /*title,
        category,
        content: {
          createMany: { data: content },
        },*/
      },
    });
  },
});

export default addPagesResolver;
