import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";

const { handler: deletePageHandler } = createHandler({
  rawHandler: async ({
    request: {
      params: { name },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
  }: RawHandlerArguments): Promise<void> => {
    const redisDelete = jsonRedisClient.del(`page-${name}`);
    const postgreDelete = postgreSQLClient.page.delete({
      where: { name },
    });
    await Promise.all([redisDelete, postgreDelete]);
    response.sendStatus(200);
  },
});
export default deletePageHandler;
