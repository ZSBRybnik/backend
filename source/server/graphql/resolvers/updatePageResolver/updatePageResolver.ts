import { Subpage } from "@prisma/postgresql";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const updatePagesResolver = createResolver<
  {
    name?: string;
    title?: string;
    category?: string;
  },
  {
    name?: boolean;
    title?: boolean;
    category?: boolean;
  }
>({
  rawResolver: async ({
    fields: {
      //title: titleField = false,
      // category: categoryField = false,
      name: nameField = false,
    },
    argument: { name /*title, category*/ },
  }): Promise<Partial<Subpage>> => {
    await postgreSQLClient.subpage.update({
      data: {
        name,
        //title,
        //category,
      },
      where: { name },
    });
    return (
      (await postgreSQLClient.subpage.findUnique({
        where: { name },
        select: {
          name: nameField,
          //title: titleField,
          //category: categoryField,
        },
      })) ?? {}
    );
  },
});

export default updatePagesResolver;
