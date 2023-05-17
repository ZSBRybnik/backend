import { join } from "path";
import { python } from "pythonia";
import type {
  AskDeveloperAgentArguments,
  AskDeveloperAgentOutput,
} from "./askDeveloperAgent.types";

const filePath = join(
  process.cwd(),
  "source",
  "native-addon-python",
  "source",
  "utils",
  "ask_developer_agent",
  "ask_developer_agent.py",
);

console.log(filePath);
const { ask_developer_agent: askDeveloperAgentInPython } = await python(
  filePath,
);

const askDeveloperAgent = async ({
  prompt,
}: AskDeveloperAgentArguments): Promise<AskDeveloperAgentOutput> => {
  console.log("dupa");
  const output = {
    output: askDeveloperAgentInPython(
      "",
      "paraphrase-multilingual-mpnet-base-v2",
      prompt,
    ),
  };
  console.log(output);
  return output;
};

export default askDeveloperAgent;
