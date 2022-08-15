import deletePostResolver from "~root/source/server/graphql/resolvers/deletePostResolver/deletePostResolver";
import Routes from "../../constants/routes/routes";
import inputDeletePage from "../../inputs/inputDeletePage/inputDeletePage";
import getDeletePageMeta from "../../metas/getDeletePageMeta/getDeletePageMeta";
import outputDeletePost from "../../outputs/outputDeletePost/outputDeletePost";

const deletePost = () => {
  return {
    route: Routes.DeletePage,
    handler: {
      meta: getDeletePageMeta,
      input: inputDeletePage,
      output: outputDeletePost,
      resolve: deletePostResolver,
    },
  };
};

export default deletePost;
