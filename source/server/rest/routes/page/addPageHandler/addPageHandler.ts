import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import addPageHandlerValidator from "../../../validators/pageValidators/addPageHandlerValidator/addPageHandlerValidator";

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
    next,
  }: RawHandlerArguments<{ body: AddPageHandler }>): Promise<void> => {
    const validator = addPageHandlerValidator();
    try {
      await validator.validate(
        { name, title, content },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    await postgreSQLClient.page.create({
      data: { name, title, content },
    });
    response.sendStatus(200);
  },
});

export default addPageHandler;
