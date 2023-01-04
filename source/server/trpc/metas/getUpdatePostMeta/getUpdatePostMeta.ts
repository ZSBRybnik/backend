import HTTPMethods from "~backend/source/server/rest/constants/httpMethods/httpMethods";
import Routes from "../../constants/routes/routes";

const getUpdatePostMeta = () => {
  return {
    openapi: {
      enabled: true,
      method: HTTPMethods.Put,
      path: `/${Routes.UpdatePost}`,
    },
  };
};
export default getUpdatePostMeta;
