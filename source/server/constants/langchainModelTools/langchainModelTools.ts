import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

const langchainModelTools: [SerpAPI, Calculator] = [
  new SerpAPI(),
  new Calculator(),
];

export default langchainModelTools;
