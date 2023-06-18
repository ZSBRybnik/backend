import createDeveloperAgent from "../../utils/createDeveloperAgent/createDeveloperAgent";

const { output: developerAgent } = await createDeveloperAgent();

export default developerAgent;
