export type AskDeveloperAgentArguments = {
  prompt: string;
};

export type AskDeveloperAgentOutput = {
  output: string;
};

export type PythoniaOutput = {
  ask_developer_agent: (agent: any, prompt: string) => Promise<string>;
};
