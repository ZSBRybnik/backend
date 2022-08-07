import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const postsResolver = createResolver<
  {
    ids?: number[];
  },
  {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    author?: boolean;
    brief?: boolean;
  }
>({
  rawResolver: async ({
    fields: {
      id = false,
      title = false,
      content = false,
      author = false,
      brief = false,
    },
    argument: { ids },
  }) => {
    const conditions =
      ids?.map((id: number): { id: number } => {
        return { id };
      }) ?? null;
    return await postgreSQLClient.post.findMany({
      select: { id, title, content, author, brief },
      where: conditions ? { OR: conditions } : undefined,
    });
  },
});
export default postsResolver;
