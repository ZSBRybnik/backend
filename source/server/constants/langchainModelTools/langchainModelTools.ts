import { Calculator, SerpAPI } from "langchain/tools";

const langchainModelTools: [SerpAPI, Calculator] = [
  new SerpAPI(),
  new Calculator(),
];

export default langchainModelTools;
