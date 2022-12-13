import { createEnum } from "schemix";

export enum AuthenticationTypes {
  Application = "application",
  Phone = "phone",
  PhoneWithCalls = "phoneWithCalls",
  Disabled = "disabled",
}

const authenticationTypes: Set<AuthenticationTypes> = new Set([
  AuthenticationTypes.Application,
  AuthenticationTypes.Disabled,
  AuthenticationTypes.Phone,
  AuthenticationTypes.PhoneWithCalls,
]);

const authenticationType = createEnum((authenticationTypeEnum) => {
  authenticationTypes.forEach((type) => {
    authenticationTypeEnum.addValue(type);
  });
});

export default authenticationType;
