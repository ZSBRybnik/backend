import twilioClient from "~backend/source/server/clients/twilioClient/twilioClient";
import createMiddleware from "../../utils/createMiddleware/createMiddleware";
import { RawMiddlewareArguments } from "../../utils/createMiddleware/createMiddleware.types";

const getTwilioClientMiddleware = () => {
  const { middleware: twilioClientMiddleware } = createMiddleware({
    rawMiddleware: async ({ request, next }: RawMiddlewareArguments) => {
      request.twilioClient = twilioClient;
      next();
    },
  });
  return twilioClientMiddleware;
};

export default getTwilioClientMiddleware;
