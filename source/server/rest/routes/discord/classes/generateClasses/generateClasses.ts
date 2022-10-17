import discordClient from "~backend/source/server/clients/discordClient/discordClient";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";

const { handler: getPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: { postgreSQLClient },
  }: RawHandlerArguments): Promise<void> => {
    console.log("xxxxxxxxxxxxxxxxxxx");
    const classes = await postgreSQLClient.class.findMany();
    classes.forEach(async ({ name }) => {
      const cd = await discordClient.guilds.create({ name });
      console.log(cd);
    });
  },
});

export default getPostHandler;
