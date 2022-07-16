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
    request: {
      body: { title, author, content },
      postgreSQLClient,
    },
    response,
  }: RawHandlerArguments<{
    body: AddPostHandler;
  }>): Promise<void> => {
    await postgreSQLClient.post.create({
      data: { title, author, content },
    });
    response.sendStatus(200);
  },
});

export default addPostHandler;
