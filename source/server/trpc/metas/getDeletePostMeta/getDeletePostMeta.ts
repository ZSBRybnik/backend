import HTTPMethods from "~backend/source/server/rest/constants/httpMethods/httpMethods";
import Routes from "../../constants/routes/routes";

const getDeletePostMeta = () => {
  return {
    openapi: {
      enabled: true,
      method: HTTPMethods.Delete,
      path: `/${Routes.DeletePost}`,
    },
  };
};
export default getDeletePostMeta;
