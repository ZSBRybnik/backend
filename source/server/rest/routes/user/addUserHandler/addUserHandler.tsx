import { hash } from "bcrypt";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import EnabledTwoFactorAuthentication from "~backend/source/server/constants/enabledTwoFactorAuthentication/enabledTwoFactorAuthentication";
import Roles from "~backend/source/server/constants/roles/Roles";
import AddUserEmail from "~backend/source/server/emails/templates/addUserEmail/addUserEmail";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";
import generateRandomPassword from "../../../utils/generateRandomPassword/generateRandomPassword";
import sendEmail from "../../../utils/sendEmail/sendEmail";
import addUserHandlerErrorCodes from "./addUserHandlerErrorCodes";
import validateAddUserHandler from "./validateAddUserHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     addUser:
 *       type: object
 *       required:
 *         - login
 *         - role
 *         - password
 *         - email
 *         - enabledTwoFactorAuthentication
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         login:
 *           type: string
 *           description: User login
 *         role:
 *           type: User role
 *           description: Post content
 *         password:
 *           type: string
 *           description: User password
 *         email:
 *           type: email
 *           description: User email
 *         authenticatorCode:
 *           type: string
 *           description: User authenticator code
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *         enabledTwoFactorAuthentication:
 *           type: string
 *           description: enabled two factor authentication?
 *         lockerNumber:
 *           type: number
 *           description: User locker number
 *         lockerPin:
 *           type: number
 *           description: User locker pin
 *       example:
 *         login: RandomLogin
 *         role: administrator
 *         email: email@gmail.com
 *         phoneNumber: 21372137
 *         enabledTwoFactorAuthentication: application
 */

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Do naprawy bearer token
 *     tags:
 *       - User endpoints
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/addUser'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Failed create user.
 */

export type AddUserHandlerBody = {
  login: string;
  email: string;
  role: Roles;
  phoneNumber: string;
  enabledTwoFactorAuthentication: EnabledTwoFactorAuthentication;
  lockerNumber: number;
  lockerPin: number;
};

const { handler: addUserHandler }: CreateHandlerOutput = createHandler({
  defaultSuccessfullStatusCode: 201,
  rawHandler: async ({
    request: { body, verifyToken, emailSenderClient },
    response,
    next,
  }: RawHandlerArguments<{
    body: AddUserHandlerBody;
  }>): Promise<void> => {
    const { login, email } = body;
    await validateAddUserHandler({ response, next, data: body });
    verifyToken();
    const randomPassword = generateRandomPassword();
    const hashedPassword: string = await hash(randomPassword, 11);
    const googleAuthCode: string = authenticator.generateSecret();
    await addUserHandlerErrorCodes({
      response,
      next,
      data: {
        ...body,
        authenticatorCode: googleAuthCode,
        password: hashedPassword,
      },
    });
    const qrCodeString: string = `otpauth://totp/zsbrybnik?secret=${googleAuthCode}`;
    const base64QrCode: string = await toDataURL(qrCodeString);
    await sendEmail({
      instance: emailSenderClient,
      to: email,
      subject: "Rejestracja",
      html: (
        <AddUserEmail
          password={randomPassword}
          qrCode={base64QrCode}
          login={login}
        />
      ),
      response,
      next,
    });
  },
});

export default addUserHandler;
