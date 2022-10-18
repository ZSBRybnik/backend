import ericClient from "~backend/source/server/clients/erisClient/ericClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";

import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";

const { handler: getPostHandler } = createHandler({
  rawHandler: async (): Promise<void> => {
    const classes = await postgreSQLClient.class.findMany();
    classes.forEach(async ({ name }) => {
      await ericClient.createChannel(
        process.env.DISCORD_SERVER_ID as string,
        name,
      );
    });
  },
});

export default getPostHandler;
