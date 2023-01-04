import { ContentItem, Post } from "@prisma/postgresql";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const updatePostResolver = createResolver<
  {
    id: number;
    authorId?: number;
    title?: string;
    brief?: string;
    content: ContentItem[];
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
      //content: contentField = false,
      id: idField = false,
      authorId: authorIdField = false,
      brief: briefField = false,
    },
    argument: { id, authorId, title, brief, content },
  }): Promise<Partial<Post>> => {
    content.map(({ id: contentId }) => {
      return contentId;
    });
    const { id: postId, ...postData } = await postgreSQLClient.post.update({
      data: {
        authorId,
        title,
        brief,
        /*content: {
          updateMany: {
            data: content,
            where: {
              id: { in: contentIds },
            },
          },
        },
        */
      },
      select: {
        brief: briefField,
        title: titleField,
        //content: contentField,
        id: idField,
        authorId: authorIdField,
      },
      where: { id },
    });
    natsClient.publish(
      `post.update.${postId}`,
      jsonCodec.encode({ id: postId, ...postData }),
    );
    return { id: postId, ...postData };
  },
});

export default updatePostResolver;
