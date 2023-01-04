import HTTPMethods from "~backend/source/server/rest/constants/httpMethods/httpMethods";
import Routes from "../../constants/routes/routes";

const getDeletePageMeta = () => {
  return {
    openapi: {
      enabled: true,
      method: HTTPMethods.Put,
      path: `/${Routes.UpdatePage}`,
    },
  };
};
export default getDeletePageMeta;
