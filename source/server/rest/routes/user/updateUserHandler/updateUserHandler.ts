import createHandler from "~server/rest/utils/createHandler/createHandler";
import Request from "../../../types/request/request";

const { handler: updateUserHandler } = createHandler({
  rawHandler: async ({ request, response }): Promise<void> => {
    try {
      const {
        params: { id, login, role, password, email, authenticator_code },
        postgreSQLClient,
      }: Request = request;
      await postgreSQLClient.user.update({
        where: { id: parseInt(id) },
        data: { login, role, password, email, authenticator_code },
      });
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default updateUserHandler;
