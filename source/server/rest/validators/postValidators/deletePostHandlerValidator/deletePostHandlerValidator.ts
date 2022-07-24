import { number, object } from "yup";

const deletePostHandlerValidator = () => {
  return object().shape({
    id: number().positive().required(),
  });
};
export default deletePostHandlerValidator;
