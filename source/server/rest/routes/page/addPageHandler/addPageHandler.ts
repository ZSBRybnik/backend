import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";

type AddPageHandler = {
  name: string;
  title: string;
  content: string;
};

const { handler: addPageHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { name, title, content },
      postgreSQLClient,
    },
    response,
  }: RawHandlerArguments<{ body: AddPageHandler }>): Promise<void> => {
    await postgreSQLClient.page.create({
      data: { name, title, content },
    });
    response.sendStatus(200);
  },
});

export default addPageHandler;
