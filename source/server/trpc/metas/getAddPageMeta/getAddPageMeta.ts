import HTTPMethods from "~backend/source/server/rest/constants/httpMethods/httpMethods";
import Routes from "../../constants/routes/routes";

const getAddPageMeta = () => {
  return {
    openapi: {
      enabled: true,
      method: HTTPMethods.Post,
      path: `/${Routes.AddPage}`,
    },
  };
};
export default getAddPageMeta;
