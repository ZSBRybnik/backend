import { OpenAI } from "langchain";

const openAIClient: OpenAI = new OpenAI({
  temperature: 0,
});

export default openAIClient;
