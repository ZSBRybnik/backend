export enum TargetType {
  Server = "server",
}

const target: TargetType = process.env.TARGET as TargetType;

export default target;
