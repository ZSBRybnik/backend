import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const pagesResolver = createResolver<
  {
    ids?: number[];
  },
  {
    name?: boolean;
    id?: boolean;
    title?: boolean;
    content?: boolean;
  }
>({
  rawResolver: async ({
    fields: { name = false, id = false, title = false, content = false },
    argument: { ids },
  }) => {
    const conditions =
      ids?.map((id: number): { id: number } => {
        return { id };
      }) ?? null;
    return await postgreSQLClient.page.findMany({
      select: { id, name, title, content },
      where: conditions ? { OR: conditions } : undefined,
    });
  },
});

export default pagesResolver;
