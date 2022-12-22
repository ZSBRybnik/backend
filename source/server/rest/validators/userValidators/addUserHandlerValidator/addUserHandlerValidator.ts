import { mixed, object, string } from "yup";
import AuthenticationType from "~backend/source/server/constants/authenticationType/authenticationType";
import Roles from "~backend/source/server/constants/roles/roles";

const addUserHandlerValidator = () => {
  return object().shape({
    login: string().required(),
    email: string().email().required(),
    role: mixed<Roles>().oneOf(Object.values(Roles)).required(),
    phoneNumber: string(),
    enabledTwoFactorAuthentication: mixed<AuthenticationType>().oneOf(
      Object.values(AuthenticationType),
    ),
  });
};
export default addUserHandlerValidator;
