import { Handler } from "aws-lambda";

const serverless = eval('require(".")');

// eslint-disable-next-line max-params
export const handler: Handler = async (event, context) => {
  const lambda = await serverless.zsbrybnik;
  return lambda.default(event, context);
};
