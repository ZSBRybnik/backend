export enum TargetType {
  Server = "server",
  Serverless = "serverless",
}

const target: TargetType = process.env.TARGET as TargetType;

export default target;
