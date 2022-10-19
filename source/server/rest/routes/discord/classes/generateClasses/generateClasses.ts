import { CategoryChannel, TextChannel, TextVoiceChannel } from "eris";
import ericClient from "~backend/source/server/clients/erisClient/ericClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";

const { handler: getPostHandler } = createHandler({
  rawHandler: async (): Promise<void> => {
    const classes = await postgreSQLClient.class.findMany({
      select: {
        id: true,
        name: true,
        subjects: {
          select: {
            subject: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
    classes.forEach(async ({ name, subjects }) => {
      const { id }: CategoryChannel = await ericClient.createChannel(
        process.env.DISCORD_SERVER_ID as string,
        name,
        4,
      );
      subjects.forEach(async ({ subject: { name: subjectName } }) => {
        const createVoiceChannelPromise: Promise<TextVoiceChannel> =
          ericClient.createChannel(
            process.env.DISCORD_SERVER_ID as string,
            subjectName,
            2,
            { userLimit: 2, parentID: id },
          );
        const createTextChannelPromise: Promise<TextChannel> =
          ericClient.createChannel(
            process.env.DISCORD_SERVER_ID as string,
            subjectName,
            0,
            { parentID: id },
          );
        await Promise.all([
          createVoiceChannelPromise,
          createTextChannelPromise,
        ]);
      });
    });
  },
});

export default getPostHandler;
