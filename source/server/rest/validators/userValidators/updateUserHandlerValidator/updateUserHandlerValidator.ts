import { mixed, object, string } from "yup";
import Roles from "~backend/source/server/constants/roles/roles";

const updateUserHandlerValidator = () => {
  return object().shape({
    login: string(),
    role: mixed<Roles>().oneOf(Object.values(Roles)),
    email: string().email(),
  });
};
export default updateUserHandlerValidator;
