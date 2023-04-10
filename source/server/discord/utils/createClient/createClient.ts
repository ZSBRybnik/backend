import { Client, ClientOptions, GatewayIntentBits } from "discord.js";

type CreateClientArguments = {
  token: string;
  eventMapper?: any;
  options?: ClientOptions;
};

const createClient = ({ token, options }: CreateClientArguments): Client => {
  const { intents, ...rest } = Object(options);
  const client = new Client({
    intents: intents || [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ],
    ...rest,
  });
  /*if (eventMapper) {
    eventMapperUnwraper<Callback>(client, eventMapper);
  }*/
  client.login(token);
  return client;
};

export default createClient;
