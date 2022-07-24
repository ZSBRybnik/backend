import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import deletePageHandlerValidator from "../../../validators/pageValidators/deletePageHandlerValidator/deletePageHandlerValidator";

const { handler: deletePageHandler } = createHandler({
  rawHandler: async ({
    request: {
      params: { name },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const validator = deletePageHandlerValidator();
    try {
      await validator.validate({ name }, { strict: true, abortEarly: true });
    } catch {
      response.sendStatus(400);
      return next();
    }
    try {
      const redisDelete = jsonRedisClient.del(`page-${name}`);
      const postgreDelete = postgreSQLClient.page.delete({
        where: { name },
      });
      await Promise.all([redisDelete, postgreDelete]);
      response.sendStatus(200);
    } catch {
      response.sendStatus(500);
    }
  },
});
export default deletePageHandler;
