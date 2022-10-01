import { Post } from "@prisma/postgresql";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const updatePostResolver = createResolver<
  {
    id: number;
    authorId?: number;
    title?: string;
    content?: string;
    brief?: string;
  },
  {
    id?: boolean;
    authorId?: boolean;
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
      authorId: authorIdField = false,
      brief: briefField = false,
    },
    argument: { id, authorId, title, content, brief },
  }): Promise<Partial<Post>> => {
    return await postgreSQLClient.post.update({
      data: { authorId, title, content, brief },
      select: {
        brief: briefField,
        title: titleField,
        content: contentField,
        id: idField,
        authorId: authorIdField,
      },
      where: { id },
    });
  },
});

export default updatePostResolver;
