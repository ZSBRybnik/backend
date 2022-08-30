import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";
import addPostHandlerErrorCodes from "./addPostHandlerErrorCodes";
import validateAddPostHandler from "./validateAddPostHandler";

export type AddPostHandler = {
  title: string;
  author: string;
  content: string;
  brief?: string;
};

const { handler: addPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title, author, content, brief },
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: AddPostHandler;
  }>): Promise<void> => {
    validateAddPostHandler({
      response,
      next,
      validationData: { title, author, content },
    });
    await addPostHandlerErrorCodes({
      response,
      next,
      data: { title, author, content, brief },
    });
  },
});

export default addPostHandler;
