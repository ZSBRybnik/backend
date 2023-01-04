import Request from "../../types/request/request";
import createMiddleware from "../../utils/createMiddleware/createMiddleware";
import {
  CreateMiddlewareOutput,
  RawMiddlewareArguments,
} from "../../utils/createMiddleware/createMiddleware.types";
import verifyToken from "../../utils/verifyToken/verifyToken";

const getVerifyTokenMiddle = () => {
  const { middleware: verifyTokenMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({
        response,
        next,
        request,
      }: RawMiddlewareArguments): Promise<void> => {
        const {
          headers: { authorization },
        }: Request = request;
        request.verifyToken = (): void => {
          verifyToken({ next, token: authorization || "", response });
        };
        next();
      },
    });
  return verifyTokenMiddleware;
};

export default getVerifyTokenMiddle;
