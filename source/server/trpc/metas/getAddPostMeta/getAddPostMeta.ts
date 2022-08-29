import HTTPMethods from "~backend/source/server/rest/constants/httpMethods/httpMethods";
import Routes from "../../constants/routes/routes";

const getAddPostMeta = () => {
  return {
    openapi: {
      enabled: true,
      method: HTTPMethods.Post,
      path: `/${Routes.AddPost}`,
    },
  };
};
export default getAddPostMeta;
