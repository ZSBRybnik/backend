import { object, string } from "yup";

const deletePageHandlerValidator = () => {
  return object().shape({
    name: string().required(),
  });
};
export default deletePageHandlerValidator;
