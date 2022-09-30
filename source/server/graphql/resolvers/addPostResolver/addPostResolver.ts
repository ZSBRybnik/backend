import { Post } from "@prisma/client";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

import createResolver from "../../utils/createResolver/createResolver";

const addPostResolver = createResolver<
  {
    authorId: number;
    title: string;
    content: string;
    brief: string;
  },
  Record<string, boolean>
>({
  // tslint:disable-next-line: typedef
  rawResolver: async ({
    argument: { authorId, title, content, brief },
  }): Promise<Partial<Post>> => {
    return await postgreSQLClient.post.create({
      data: {
        title,
        content,
        brief,
        authorId,
      },
    });
  },
});

export default addPostResolver;
