import { mixed, object, string } from "yup";
import Roles from "~server/constants/roles/Roles";

const updateUserHandlerValidator = () => {
  return object().shape({
    login: string(),
    role: mixed<Roles>().oneOf(Object.values(Roles)),
    email: string().email(),
  });
};
export default updateUserHandlerValidator;
