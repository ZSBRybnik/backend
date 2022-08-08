import { Post } from "@prisma/client";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const addPostResolver = createResolver<
  {
    author: string;
    title: string;
    content: string;
    brief: string;
  },
  Record<string, boolean>
>({
  // tslint:disable-next-line: typedef
  rawResolver: async ({
    argument: { author, title, content, brief },
  }): Promise<Partial<Post>> => {
    return await postgreSQLClient.post.create({
      data: { author, title, content, brief },
    });
  },
});

export default addPostResolver;
