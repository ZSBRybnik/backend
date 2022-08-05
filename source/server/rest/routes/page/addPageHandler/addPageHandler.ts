import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import addPageHandlerErrorCodes from "./addPageHandlerErrorCodes";
import validateAddPageHandler from "./validateAddPageHandler";

export type AddPageHandlerBody = {
  name: string;
  title: string;
  content: string;
};

const { handler: addPageHandler }: CreateHandlerOutput = createHandler({
  defaultSuccessfullStatusCode: 201,
  rawHandler: async ({
    request: {
      body: { name, title, content },
    },
    response,
    next,
  }: RawHandlerArguments<{ body: AddPageHandlerBody }>): Promise<void> => {
    await validateAddPageHandler({
      response,
      next,
      validationData: { name, title, content },
    });
    await addPageHandlerErrorCodes({
      response,
      next,
      data: { name, title, content },
    });
  },
});

export default addPageHandler;
