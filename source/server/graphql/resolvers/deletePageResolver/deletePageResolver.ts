import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const deletePagesResolver = createResolver<
  {
    id: number;
  },
  Record<string, boolean>
>({
  rawResolver: async ({ argument: { id } }): Promise<void> => {
    await postgreSQLClient.page.delete({
      where: { id },
    });
  },
});

export default deletePagesResolver;
