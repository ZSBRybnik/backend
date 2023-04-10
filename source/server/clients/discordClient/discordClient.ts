import createClient from "../../discord/utils/createClient/createClient";

const discordClient = createClient({ token: process.env.DISCORD_TOKEN || "" });

export default discordClient;
