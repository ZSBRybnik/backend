import { join } from "path";
import { python } from "pythonia";
import developerAgent from "../../langchain-agents/developer-agent-py/developer-agent-py";

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

const { ask_developer_agent: askDeveloperAgentInPython }: PythoniaOutput =
  await python(filePath);

const askDeveloperAgent = async ({
  prompt,
}: AskDeveloperAgentArguments): Promise<AskDeveloperAgentOutput> => {
  return {
    output: await (askDeveloperAgentInPython as any)(developerAgent, prompt),
  };
};

export default askDeveloperAgent;
