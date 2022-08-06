import { createLogger, format, transports } from "winston";

const loggerClient = createLogger({
  format: format.json(),
  transports: [new transports.File({ filename: "logs.log" })],
});

export default loggerClient;
