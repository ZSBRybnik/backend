import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const pagesResolver = createResolver<
  {
    names?: string[];
  },
  {
    name?: boolean;
    title?: boolean;
    content?: boolean;
  }
>({
  rawResolver: async ({
    fields: { name = false /*title = false, content = false */ },
    argument: { names },
  }) => {
    const conditions =
      names?.map((name: string): { name: string } => {
        return { name };
      }) ?? null;
    return await postgreSQLClient.subpage.findMany({
      select: { name /*title, content*/ },
      where: conditions ? { OR: conditions } : undefined,
    });
  },
});

export default pagesResolver;
