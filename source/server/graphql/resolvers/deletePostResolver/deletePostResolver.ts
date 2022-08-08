import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const deletePostResolver = createResolver<
  {
    id: number;
  },
  Record<string, boolean>
>({
  rawResolver: async ({ argument: { id } }): Promise<void> => {
    await postgreSQLClient.post.delete({
      where: { id },
    });
  },
});

export default deletePostResolver;
