import { TextChannel, TextVoiceChannel } from "eris";
import erisClient from "~backend/source/server/clients/erisClient/erisClient";
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
      const createCategoryPromise = await erisClient.createChannel(
        process.env.DISCORD_SERVER_ID as string,
        name,
        4,
      );
      const createRolePromise = erisClient.createRole(
        process.env.DISCORD_SERVER_ID as string,
        {
          name,
        },
      );
      const [{ id }] = await Promise.all([
        createCategoryPromise,
        createRolePromise,
      ]);
      subjects.forEach(async ({ subject: { name: subjectName } }) => {
        const createVoiceChannelPromise: Promise<TextVoiceChannel> =
          erisClient.createChannel(
            process.env.DISCORD_SERVER_ID as string,
            subjectName,
            2,
            { userLimit: 2, parentID: id },
          );
        const createTextChannelPromise: Promise<TextChannel> =
          erisClient.createChannel(
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
