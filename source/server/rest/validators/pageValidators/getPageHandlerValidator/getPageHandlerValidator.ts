import { object, string } from "yup";

const getPageHandlerValidator = () => {
  return object().shape({
    name: string().required(),
  });
};
export default getPageHandlerValidator;
