import createMiddleware from "../../utils/createMiddleware/createMiddleware";
import {
  CreateMiddlewareOutput,
  RawMiddlewareArguments,
} from "../../utils/createMiddleware/createMiddleware.types";
import sendWithValidFormat, {
  SendWithValidFormatArguments,
} from "../../utils/sendWithValidFormat/sendWithValidFormat";

const getSendWithValidFormatMiddleware = () => {
  const { middleware: postgreSQLClientMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({
        response,
        next,
      }: RawMiddlewareArguments): Promise<void> => {
        response.sendWithValidFormat = async <T extends object>({
          data,
          contentType,
        }: Omit<SendWithValidFormatArguments<T>, "response">) => {
          return await sendWithValidFormat({ data, contentType, response });
        };
        next();
      },
    });
  return postgreSQLClientMiddleware;
};
export default getSendWithValidFormatMiddleware;
