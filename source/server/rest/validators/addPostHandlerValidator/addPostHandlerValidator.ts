import { object, string } from "yup";

const addPostHandlerValidator = () => {
  return object().shape({
    title: string().required(),
    author: string().required(),
    content: string(),
  });
};
export default addPostHandlerValidator;
