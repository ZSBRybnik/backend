import { hash } from "bcrypt";
import { random, times } from "lodash";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import EnabledTwoFactorAuthentication from "~root/source/server/constants/enabledTwoFactorAuthentication/enabledTwoFactorAuthentication";
import Roles from "~server/constants/roles/Roles";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import verifyToken from "~server/rest/utils/verifyToken/verifyToken";
import addUserHandlerValidator from "../../../validators/addUserHandlerValidator/addUserHandlerValidator";

type AddUserHandlerBody = {
  login: string;
  email: string;
  role: Roles;
  phoneNumber: string;
  enabledTwoFactorAuthentication: EnabledTwoFactorAuthentication;
};

const { handler: addUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { login, email, role, phoneNumber, enabledTwoFactorAuthentication },
      headers: { authorization },
      postgreSQLClient,
      emailSenderClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: AddUserHandlerBody;
  }>): Promise<void> => {
    const validator = addUserHandlerValidator();
    try {
      await validator.validate(
        { login, role, email, phoneNumber, enabledTwoFactorAuthentication },
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
        phoneNumber,
        enabledTwoFactorAuthentication,
        password: hashedPassword,
        authenticatorCode: googleAuthCode,
      },
    });
    const qrCodeString: string = `otpauth://totp/zsbrybnik?secret=${googleAuthCode}`;
    const base64QrCode: string = await toDataURL(qrCodeString);
    await emailSenderClient.sendMail({
      from: "zsbrybnik@gmail.com",
      to: email,
      subject: "Rejestracja",
      html: `<div>${randomPassword}</div><img src="${base64QrCode}" width="200px" height="200px"/>`,
    });
    response.sendStatus(200);
  },
});

export default addUserHandler;
