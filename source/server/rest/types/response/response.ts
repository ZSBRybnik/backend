import { Response as ResponseBase } from "express";
import { SendWithValidFormatArguments } from "../../utils/sendWithValidFormat/sendWithValidFormat";

type Response = ResponseBase & {
  sendWithValidFormat: <T extends object>({
    data,
  }: Pick<SendWithValidFormatArguments<T>, "data">) => Promise<void>;
};

export default Response;
