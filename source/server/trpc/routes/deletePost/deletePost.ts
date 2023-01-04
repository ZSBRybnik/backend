import deletePostResolver from "~backend/source/server/graphql/resolvers/deletePostResolver/deletePostResolver";
import Routes from "../../constants/routes/routes";
import inputDeletePost from "../../inputs/inputDeletePost/inputDeletePost";
import getDeletePostMeta from "../../metas/getDeletePostMeta/getDeletePostMeta";
import outputDeletePost from "../../outputs/outputDeletePost/outputDeletePost";

const deletePost = () => {
  return {
    route: Routes.DeletePost,
    handler: {
      meta: getDeletePostMeta,
      input: inputDeletePost,
      output: outputDeletePost,
      resolve: deletePostResolver,
    },
  };
};

export default deletePost;
