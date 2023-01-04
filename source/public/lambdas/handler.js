/* eslint-disable @typescript-eslint/ban-ts-comment */
const serverless = eval(`require(".")`);

// @ts-ignore
// eslint-disable-next-line max-params
module.exports.handler = async (event, context) => {
  const lambda = await serverless.zsbrybnik;
  return lambda.default(event, context);
};
