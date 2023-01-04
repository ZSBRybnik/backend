import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";
import AuthenticationTypes from "~backend/source/server/constants/authenticationType/authenticationType";

const authenticationTypes: Set<AuthenticationTypes> = new Set([
  AuthenticationTypes.Application,
  AuthenticationTypes.Disabled,
  AuthenticationTypes.Phone,
  AuthenticationTypes.PhoneWithCalls,
]);

const schemixAuthenticationType: PrismaEnum = createEnum(
  (authenticationTypeEnum: PrismaEnum): void => {
    authenticationTypes.forEach((type: AuthenticationTypes): void => {
      authenticationTypeEnum.addValue(type);
    });
  },
);

export default schemixAuthenticationType;
