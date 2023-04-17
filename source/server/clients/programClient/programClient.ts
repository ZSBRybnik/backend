import { Command } from "commander";

const programClient: Command = new Command();
programClient.parse(process.argv);

export default programClient;
