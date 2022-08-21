import Routes from "../../constants/routes/routes";
import inputUpdatePage from "../../inputs/inputUpdatePage/inputUpdatePage";
import getUpdatePageMeta from "../../metas/getUpdatePageMeta/getUpdatePageMeta";
import outputUpdatePage from "../../outputs/outputUpdatePage/outputUpdatePage";
import updatePageResolver from "../../resolvers/updatePageResolver/updatePageResolver";

const updatePage = () => {
  return {
    route: Routes.UpdatePage,
    handler: {
      meta: getUpdatePageMeta,
      input: inputUpdatePage,
      output: outputUpdatePage,
      resolve: updatePageResolver,
    },
  };
};

export default updatePage;
