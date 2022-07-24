import { Response as ResponseBase } from "express";
import { SendWithValidFormatArguments } from "../../utils/sendWithValidFormat/sendWithValidFormat";

type Response = ResponseBase & {
  sendWithValidFormat: <T extends object>({
    data,
    contentType,
  }: Omit<SendWithValidFormatArguments<T>, "response">) => Promise<void>;
};

export default Response;
