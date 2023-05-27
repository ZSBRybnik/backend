import { join } from "path";
import { python } from "pythonia";

import type {
  AskDeveloperAgentArguments,
  AskDeveloperAgentOutput,
  PythoniaOutput,
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
const { ask_developer_agent: askDeveloperAgentInPython }: PythoniaOutput =
  await python(filePath);

const askDeveloperAgent = async ({
  prompt,
}: AskDeveloperAgentArguments): Promise<AskDeveloperAgentOutput> => {
  const output = {
    output: await askDeveloperAgentInPython(
      "", // ggml-gpt4all-j-v1.3-groovy.bin
      "paraphrase-multilingual-mpnet-base-v2",
      prompt,
    ),
  };
  return output;
};

export default askDeveloperAgent;
