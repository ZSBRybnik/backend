import type { Server } from "http";
import type { ListenOnPortArguments, ListenOnPort } from "./listenOnPort.types";

const listenOnPort: ListenOnPort = ({
  instance,
  port,
  callback,
}: ListenOnPortArguments): Server => {
  return instance.listen(port, callback);
};

export default listenOnPort;
