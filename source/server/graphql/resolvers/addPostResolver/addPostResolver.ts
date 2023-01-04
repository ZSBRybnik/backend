import { ContentItem } from "@prisma/postgresql";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createResolver from "../../utils/createResolver/createResolver";

const addPostResolver = createResolver<
  {
    authorId: number;
    title: string;
    brief: string;
    content: Omit<ContentItem, "id">[];
  },
  Record<string, boolean>
>({
  // tslint:disable-next-line: typedef
  rawResolver: async ({ argument: { authorId, title, brief /*content*/ } }) => {
    const { id, ...postData } = await postgreSQLClient.post.create({
      data: {
        title,
        brief,
        authorId,
        isDisabled: false,
        /*content: {
          createMany: { data: content },
        },*/
      },
    });
    natsClient.publish(`post.add.${id}`, jsonCodec.encode({ id, ...postData }));
    return { id, ...postData };
  },
});

export default addPostResolver;
