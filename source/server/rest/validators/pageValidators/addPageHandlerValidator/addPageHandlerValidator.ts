import { object, string } from "yup";

const addPageHandlerValidator = () => {
  return object().shape({
    name: string().required(),
    title: string().required(),
    content: string(),
  });
};
export default addPageHandlerValidator;
