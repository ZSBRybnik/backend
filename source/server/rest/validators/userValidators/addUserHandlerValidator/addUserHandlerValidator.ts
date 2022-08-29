import { mixed, object, string } from "yup";
import EnabledTwoFactorAuthentication from "~backend/source/server/constants/enabledTwoFactorAuthentication/enabledTwoFactorAuthentication";
import Roles from "~backend/source/server/constants/roles/Roles";

const addUserHandlerValidator = () => {
  return object().shape({
    login: string().required(),
    email: string().email().required(),
    role: mixed<Roles>().oneOf(Object.values(Roles)).required(),
    phoneNumber: string(),
    enabledTwoFactorAuthentication:
      mixed<EnabledTwoFactorAuthentication>().oneOf(
        Object.values(EnabledTwoFactorAuthentication),
      ),
  });
};
export default addUserHandlerValidator;
