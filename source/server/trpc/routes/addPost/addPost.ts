import Routes from "../../constants/routes/routes";
import inputAddPost from "../../inputs/inputAddPost/inputAddPost";
import getAddPostMeta from "../../metas/getAddPostMeta/getAddPostMeta";
import outputAddPost from "../../outputs/outputAddPost/outputAddPost";
import addPostResolver from "../../resolvers/addPostResolver/addPostResolver";

const addPost = () => {
  return {
    route: Routes.AddPost,
    handler: {
      meta: getAddPostMeta,
      input: inputAddPost,
      output: outputAddPost,
      resolve: addPostResolver,
    },
  };
};

export default addPost;
