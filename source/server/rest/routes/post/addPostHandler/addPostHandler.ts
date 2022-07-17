import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import addPostHandlerValidator from "../../../validators/addPostHandlerValidator/addPostHandlerValidator";

type AddPostHandler = {
  title: string;
  author: string;
  content: string;
};

const { handler: addPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title, author, content },
      postgreSQLClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: AddPostHandler;
  }>): Promise<void> => {
    const validator = addPostHandlerValidator();
    try {
      await validator.validate(
        { title, author, content },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    await postgreSQLClient.post.create({
      data: { title, author, content },
    });
    response.sendStatus(200);
  },
});

export default addPostHandler;
