import { object, string } from "yup";

const updatePageHandlerValidator = () => {
  return object().shape({
    title: string(),
    content: string(),
  });
};
export default updatePageHandlerValidator;
