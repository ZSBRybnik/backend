import { number, object } from "yup";

const getPostHandlerValidator = () => {
  return object().shape({ id: number().positive().required() });
};
export default getPostHandlerValidator;
