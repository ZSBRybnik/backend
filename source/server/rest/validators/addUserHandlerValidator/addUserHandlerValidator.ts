import { mixed, object, string } from "yup";
import Roles from "~server/constants/roles/Roles";

const addUserHandlerValidator = () => {
  return object().shape({
    login: string().required(),
    email: string().email().required(),
    role: mixed<Roles>().oneOf(Object.values(Roles)).required(),
  });
};
export default addUserHandlerValidator;
