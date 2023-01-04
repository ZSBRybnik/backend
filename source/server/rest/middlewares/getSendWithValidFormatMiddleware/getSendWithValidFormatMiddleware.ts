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
        request: {
          headers: { "content-type": contentType = "" },
        },
      }: RawMiddlewareArguments): Promise<void> => {
        response.sendWithValidFormat = async <T extends object>({
          data,
        }: Pick<SendWithValidFormatArguments<T>, "data">): Promise<void> => {
          return await sendWithValidFormat({ data, contentType, response });
        };
        next();
      },
    });
  return postgreSQLClientMiddleware;
};
export default getSendWithValidFormatMiddleware;
