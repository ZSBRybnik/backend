import createEmailSender from "../../utils/createEmailSender/createEmailSender";
import createMiddleware from "../../utils/createMiddleware/createMiddleware";

import { CreateMiddlewareOutput } from "../../utils/createMiddleware/createMiddleware.types";
const getEmailSenderMiddleware = () => {
  const { middleware: emailSenderMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({ request, next }) => {
        request.emailSenderClient = createEmailSender({
          username: "aracely.davis26@ethereal.email",
          password: "gaRGE8KbMPTHbdBcXF",
        });
        next();
      },
    });
  return emailSenderMiddleware;
};

export default getEmailSenderMiddleware;
