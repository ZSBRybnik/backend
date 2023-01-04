import { object, string } from "yup";

const loginHandlerValidator = () => {
  return object().shape({
    login: string().required(),
    password: string().required(),
  });
};
export default loginHandlerValidator;
