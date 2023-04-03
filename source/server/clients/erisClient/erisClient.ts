import eris from "eris";

const erisClient = eris(
  process.env.DISCORD_TOKEN ? `Bot ${process.env.DISCORD_TOKEN}` : "",
  {
    intents: ["guilds", "guildMembers", "guildBans", "guildEmojisAndStickers"],
    getAllUsers: true,
  },
);
erisClient.on("ready", () => {
  console.log("Ready!");
});
await erisClient.connect();

export default erisClient;
