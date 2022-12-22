import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const deletePagesResolver = createResolver<
  {
    name: string;
  },
  Record<string, boolean>
>({
  rawResolver: async ({ argument: { name } }): Promise<void> => {
    await postgreSQLClient.subpage.delete({
      where: { name },
    });
  },
});

export default deletePagesResolver;
