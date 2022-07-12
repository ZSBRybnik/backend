import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import Request from "../../../types/request/request";

type AddPostHandler = {
  title: string;
  author: string;
  content: string;
};

const { handler: addPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
  }: RawHandlerArguments<{
    body: AddPostHandler;
  }>): Promise<void> => {
    const {
      body: { title, author, content },
      postgreSQLClient,
    }: Request<{
      body: AddPostHandler;
    }> = request;
    await postgreSQLClient.post.create({
      data: { title, author, content },
    });
    response.sendStatus(200);
  },
});

export default addPostHandler;
