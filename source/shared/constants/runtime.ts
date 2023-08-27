export enum Runtime {
  Node = "node",
  Bun = "bun",
}

const runtime = typeof Bun !== "undefined" ? Runtime.Bun : Runtime.Node;

export default runtime;
