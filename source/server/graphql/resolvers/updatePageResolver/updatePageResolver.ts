import { Page } from "@prisma/client";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const updatePagesResolver = createResolver<
  {
    id: number;
    name?: string;
    title?: string;
    content?: string;
  },
  {
    id?: boolean;
    name?: boolean;
    title?: boolean;
    content?: boolean;
  }
>({
  rawResolver: async ({
    fields: {
      title: titleField = false,
      content: contentField = false,
      id: idField = false,
      name: nameField = false,
    },
    argument: { id, name, title, content },
  }): Promise<Partial<Page>> => {
    await postgreSQLClient.page.update({
      data: { name, title, content },
      where: { id },
    });
    return (
      (await postgreSQLClient.page.findUnique({
        where: { id },
        select: {
          name: nameField,
          title: titleField,
          content: contentField,
          id: idField,
        },
      })) ?? {}
    );
  },
});

export default updatePagesResolver;
