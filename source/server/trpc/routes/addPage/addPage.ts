import addPagesResolver from "~backend/source/server/graphql/resolvers/addPageResolver/addPageResolver";
import Routes from "../../constants/routes/routes";
import inputAddPage from "../../inputs/inputDeletePage/inputDeletePage";
import getAddPageMeta from "../../metas/getAddPageMeta/getAddPageMeta";
import outputAddPage from "../../outputs/outputAddPage/outputAddPage";

const addPage = () => {
  return {
    route: Routes.AddPage,
    handler: {
      meta: getAddPageMeta,
      input: inputAddPage,
      output: outputAddPage,
      resolve: addPagesResolver,
    },
  };
};

export default addPage;
