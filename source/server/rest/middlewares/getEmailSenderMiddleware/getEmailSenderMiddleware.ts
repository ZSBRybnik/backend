import emailSenderClient from "~backend/source/server/clients/emailSenderClient/emailSenderClient";
import createMiddleware from "~backend/source/server/rest/utils/createMiddleware/createMiddleware";
import { CreateMiddlewareOutput } from "~backend/source/server/rest/utils/createMiddleware/createMiddleware.types";

const getEmailSenderMiddleware = () => {
  const { middleware: emailSenderMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({ request, next }) => {
        request.emailSenderClient = emailSenderClient;
        next();
      },
    });
  return emailSenderMiddleware;
};

export default getEmailSenderMiddleware;
