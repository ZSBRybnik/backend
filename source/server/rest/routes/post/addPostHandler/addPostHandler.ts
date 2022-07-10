import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";

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
    const { title, author, content }: AddPostHandler = request.body;
    await request.postgreSQLClient.post.create({
      data: { title, author, content },
    });
    response.sendStatus(200);
  },
});

export default addPostHandler;
