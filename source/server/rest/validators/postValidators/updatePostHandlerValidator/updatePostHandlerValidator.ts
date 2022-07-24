import { object, string } from "yup";

const updatePostHandlerValidator = () => {
  return object().shape({
    title: string(),
    author: string(),
    content: string(),
  });
};
export default updatePostHandlerValidator;
