export type AskDeveloperAgentArguments = {
  prompt: string;
};

export type AskDeveloperAgentOutput = {
  output: string;
};

export type PythoniaOutput = {
  ask_developer_agent: (
    modelPath: string,
    embeddingsModelName: string,
    prompt: string,
  ) => Promise<string>;
};
