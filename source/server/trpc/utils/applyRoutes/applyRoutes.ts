import { DefaultErrorShape, LegacyRouter } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import addPage from "../../routes/addPage/addPage";
import deletePage from "../../routes/deletePage/deletePage";
import deletePost from "../../routes/deletePost/deletePost";

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
  return instance
    .mutation(deletePostRoute, deletePostHandler as any)
    .mutation(deletePageRoute, deletePageHandler as any)
    .mutation(addPageRoute, addPageHandler as any);
};
export default applyRoutes;
