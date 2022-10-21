import eris from "eris";

const erisClient = eris(
  process.env.DISCORD_TOKEN ? `Bot ${process.env.DISCORD_TOKEN}` : "",
  {
    intents: ["all"],
    getAllUsers: true,
  },
);
erisClient.on("ready", () => {
  console.log("Ready!");
});
await erisClient.connect();

export default erisClient;
