import { number, object, string } from "yup";

const addPostHandlerValidator = () => {
  return object().shape({
    title: string().required(),
    authorId: number().required().positive().integer(),
    content: string().required(),
    brief: string(),
  });
};
export default addPostHandlerValidator;
