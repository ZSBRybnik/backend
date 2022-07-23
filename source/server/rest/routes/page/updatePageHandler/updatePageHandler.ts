import { Page } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";

const { handler: updatePageHandler } = createHandler({
  rawHandler: async ({
    request: {
      body: { title, content },
      params: { name },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
  }: RawHandlerArguments<{ body: Omit<Page, "id"> }>): Promise<void> => {
    await postgreSQLClient.page.update({
      where: { name },
      data: { title, content },
    });
    const redisPage = await jsonRedisClient.get(`page-${name}`);
    if (redisPage) {
      await jsonRedisClient.set(`page-${name}`, { name, title, content });
    }
    response.sendStatus(200);
  },
});
export default updatePageHandler;
