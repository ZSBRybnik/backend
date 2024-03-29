import erisClient from "~backend/source/server/clients/erisClient/erisClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";

const { handler: getPostHandler } = createHandler({
  rawHandler: async (): Promise<void> => {
    const classes = await postgreSQLClient.schoolClass.findMany({
      select: {
        id: true,
        name: true,
        users: {
          select: {
            discordId: true,
          },
        },
        /*subjects: {
          select: {
            subject: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },*/
      },
    });
    classes.forEach(async ({ name, /*subjects,*/ users }) => {
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
      const [, /*{ id: categoryId }*/ { id: roleId }] = await Promise.all([
        createCategoryPromise,
        createRolePromise,
      ]);
      /*const addRolesToUsersPromise = */ new Promise((resolve) => {
        users.forEach(({ discordId }) => {
          const { id: userId } = Object(
            erisClient.guilds
              .get(process.env.DISCORD_SERVER_ID as string)
              ?.members.find(({ nick, discriminator }) => {
                console.log(nick, discriminator, discordId);
                return `${nick}#${discriminator}` === discordId;
              }),
          );
          console.log(userId);
          if (userId) {
            erisClient.addGuildMemberRole(
              process.env.DISCORD_SERVER_ID as string,
              userId,
              roleId,
            );
          }
        });
        resolve(null);
      });
      /*const addChannelsToCategoriesPromise = new Promise((resolve) => {
        subjects.forEach(async ({ subject: { name: subjectName } }) => {
          const createVoiceChannelPromise: Promise<TextVoiceChannel> =
            erisClient.createChannel(
              process.env.DISCORD_SERVER_ID as string,
              subjectName,
              2,
              { userLimit: 2, parentID: categoryId },
            );
          const createTextChannelPromise: Promise<TextChannel> =
            erisClient.createChannel(
              process.env.DISCORD_SERVER_ID as string,
              subjectName,
              0,
              { parentID: categoryId },
            );
          await Promise.all([
            createVoiceChannelPromise,
            createTextChannelPromise,
          ]);
          resolve(null);
        });
      });
      await Promise.all([
        addRolesToUsersPromise,
        addChannelsToCategoriesPromise,
      ]);*/
    });
  },
});

export default getPostHandler;
