import eris from "eris";

const erisClient = eris(
  process.env.DISCORD_TOKEN ? `Bot ${process.env.DISCORD_TOKEN}` : "",
  {
    intents: ["all"],
  },
);

export default erisClient;
