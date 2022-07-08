export type Launch = {
  dumpio?: boolean;
  headless?: boolean;
  args?: string[];
};

export type JestPuppeteerConfig = {
  launch: Launch;
  browserContext: string;
};
