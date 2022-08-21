import Routes from "../../constants/routes/routes";
import inputUpdatePost from "../../inputs/inputUpdatePost/inputUpdatePost";
import getUpdatePostMeta from "../../metas/getUpdatePostMeta/getUpdatePostMeta";
import outputUpdatePost from "../../outputs/outputUpdatePost/outputUpdatePost";
import updatePostResolver from "../../resolvers/updatePostResolver/updatePostResolver";

const updatePost = () => {
  return {
    route: Routes.UpdatePost,
    handler: {
      meta: getUpdatePostMeta,
      input: inputUpdatePost,
      output: outputUpdatePost,
      resolve: updatePostResolver,
    },
  };
};

export default updatePost;
