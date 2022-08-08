import { Post } from "@prisma/client";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const updatePostResolver = createResolver<
  {
    id: number;
    author?: string;
    title?: string;
    content?: string;
    brief?: string;
  },
  {
    id?: boolean;
    author?: boolean;
    title?: boolean;
    content?: boolean;
    brief?: boolean;
  }
>({
  rawResolver: async ({
    fields: {
      title: titleField = false,
      content: contentField = false,
      id: idField = false,
      author: authorField = false,
      brief: briefField = false,
    },
    argument: { id, author, title, content, brief },
  }): Promise<Partial<Post>> => {
    await postgreSQLClient.post.update({
      data: { author, title, content, brief },
      where: { id },
    });
    return (
      (await postgreSQLClient.post.findUnique({
        where: { id },
        select: {
          brief: briefField,
          title: titleField,
          content: contentField,
          id: idField,
          author: authorField,
        },
      })) ?? {}
    );
  },
});

export default updatePostResolver;
