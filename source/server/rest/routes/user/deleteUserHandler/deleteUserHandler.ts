import Request from "../../../types/request/request";
import createHandler from "../../../utils/createHandler/createHandler";

const { handler: deleteUserHandler } = createHandler({
  rawHandler: async ({ request, response }): Promise<void> => {
    try {
      const {
        params: { id },
        postgreSQLClient,
      }: Request = request;
      await postgreSQLClient.user.delete({
        where: { id: parseInt(id) },
      });
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default deleteUserHandler;
