import { join } from "path";
import { python } from "pythonia";

const filePath = join(
  process.cwd(),
  "source",
  "native-addon-python",
  "source",
  "utils",
  "create_developer_agent",
  "create_developer_agent.py",
);

const { create_developer_agent: createDeveloperAgentInPython } = await python(
  filePath,
);

const createDeveloperAgent = async () => {
  return {
    output: await createDeveloperAgentInPython(
      //process.env.GPT4ALL_MODEL_PATH || "", // ggml-gpt4all-j-v1.3-groovy.bin
      "paraphrase-multilingual-mpnet-base-v2",
    ),
  };
};

export default createDeveloperAgent;
