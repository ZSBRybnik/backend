import { number, object } from "yup";

const deleteUserHandlerValidator = () => {
  return object().shape({
    id: number().positive().required(),
  });
};
export default deleteUserHandlerValidator;
