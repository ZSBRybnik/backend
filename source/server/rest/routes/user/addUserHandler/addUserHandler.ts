import { hash } from "bcrypt";
import { random, times } from "lodash";
import { authenticator } from "otplib";
import Roles from "~server/constants/roles/Roles";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import verifyToken from "~server/rest/utils/verifyToken/verifyToken";
import Request from "../../../types/request/request";
import addUserHandlerValidator from "../../../validators/addUserHandlerValidator/addUserHandlerValidator";

type AddUserHandlerBody = {
  login: string;
  email: string;
  role: Roles;
};

const { handler: addUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
    next,
  }: RawHandlerArguments<{
    body: AddUserHandlerBody;
  }>): Promise<void> => {
    const {
      body: { login, email, role },
      headers: { authorization },
      postgreSQLClient, //emailSenderClient,
    }: Request<{
      body: AddUserHandlerBody;
    }> = request;
    const validator = addUserHandlerValidator();
    try {
      await validator.validate(
        { login, role, email },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    verifyToken({
      token: authorization || "",
      response,
      next,
    });
    const randomPassword: string = times(10, (): string =>
      random(35).toString(36),
    ).join("");
    const hashedPassword: string = await hash(randomPassword, 11);
    const googleAuthCode: string = authenticator.generateSecret();
    await postgreSQLClient.user.create({
      data: {
        login,
        email,
        role,
        password: hashedPassword,
        authenticator_code: googleAuthCode,
      },
    });
    //const qrCodeString: string = `otpauth://totp/zsbrybnik?secret=${googleAuthCode}`;
    //const base64QrCode: string = await toDataURL(qrCodeString);
    //const qrCode = await toString(qrCodeString, { type: "terminal" });
    //writeFileSync("out.png", base64QrCode);
    /*await emailSenderClient.sendMail({
      from: "zsbtestzsb@gmail.com",
      to: email,
      subject: "rejestracjaZSS",
      text: randomPassword,
    });*/
    response.sendStatus(200);
  },
});

export default addUserHandler;
