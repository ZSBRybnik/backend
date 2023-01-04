import { DefaultErrorShape, LegacyRouter } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import addPage from "../../routes/addPage/addPage";
import addPost from "../../routes/addPost/addPost";
import deletePage from "../../routes/deletePage/deletePage";
import deletePost from "../../routes/deletePost/deletePost";
import updatePage from "../../routes/updatePage/updatePage";
import updatePost from "../../routes/updatePost/updatePost";

type ApplyRoutesArguments = {
  instance: LegacyRouter<
    unknown,
    OpenApiMeta<Record<string, any>>,
    Record<string | number | symbol, never>,
    Record<string | number | symbol, never>,
    Record<string | number | symbol, never>,
    DefaultErrorShape
  >;
};

const applyRoutes = ({ instance }: ApplyRoutesArguments) => {
  const { route: deletePostRoute, handler: deletePostHandler } = deletePost();
  const { route: deletePageRoute, handler: deletePageHandler } = deletePage();
  const { route: addPageRoute, handler: addPageHandler } = addPage();
  const { route: addPostRoute, handler: addPostHandler } = addPost();
  const { route: updatePostRoute, handler: updatePostHandler } = updatePost();
  const { route: updatePageRoute, handler: updatePageHandler } = updatePage();

  return instance
    .mutation(deletePostRoute, deletePostHandler as any)
    .mutation(deletePageRoute, deletePageHandler as any)
    .mutation(addPageRoute, addPageHandler as any)
    .mutation(addPostRoute, addPostHandler as any)
    .mutation(updatePostRoute, updatePostHandler as any)
    .mutation(updatePageRoute, updatePageHandler as any);
};
export default applyRoutes;
