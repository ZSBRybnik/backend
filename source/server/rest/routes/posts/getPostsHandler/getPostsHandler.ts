import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";

const { handler: getPostsHandler } = createHandler({
  rawHandler: async ({
    request: {
      postgreSQLClient,
      //redisClient,
      jsonRedisClient,
      query: {
        range: rangeAsString,
        startId: startIdAsString,
        endId: endIdAsString,
      },
    },
    response,
  }: //next,
  // eslint-disable-next-line sonarjs/cognitive-complexity
  RawHandlerArguments): Promise<void> => {
    const range = parseInt(rangeAsString as string);
    const startId = parseInt(startIdAsString as string);
    const endId = parseInt(endIdAsString as string);

    // if (
    //   isNaN(range) ||
    //   (isNaN(range) && isNaN(startId)) ||
    //   (isNaN(startId) && isNaN(endId))
    // ) {

    // }
    const redisPosts = await jsonRedisClient.get(
      startId
        ? `posts-${startId}-${endId || startId + range}`
        : `posts-${range}`,
    );
    if (!redisPosts) {
      let conditions: { id: number }[] | null = null;
      if (startId) {
        conditions = [];
        const limit = range || (endId - startId || 0) + 1;
        for (let iterator = 0; iterator < limit; iterator++) {
          conditions.push({ id: startId + iterator });
        }
      }
      const posts = await postgreSQLClient.post.findMany({
        take: !startId ? range : undefined,
        where: {
          OR: startId ? (conditions as { id: number }[]) : undefined,
        },
        select: { title: true, content: true, id: true },
      });
      jsonRedisClient.set(
        startId
          ? `posts-${startId}-${endId || startId + range}`
          : `posts-${range}`,
        posts,
      );
      response.json(posts);
    } else {
      response.json(redisPosts);
    }
  },
});

export default getPostsHandler;

// tylko range = pierwsza część
// range + start id = druga czesc
//start id + end id
