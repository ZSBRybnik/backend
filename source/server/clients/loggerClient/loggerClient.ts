import { createLogger, format, Logger, transports } from "winston";

const loggerClient: Logger = createLogger({
  format: format.json(),
  transports: [new transports.File({ filename: "logs.log" })],
});

export default loggerClient;
