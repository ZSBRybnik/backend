import createClient from "../../discrod/utils/createClient/createClient";

const discordClient = createClient({ token: process.env.DISCORD_TOKEN || "" });

export default discordClient;
