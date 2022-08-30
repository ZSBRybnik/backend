import type { Express } from "express";
import Routes from "~server/rest/constants/routes/routes";
import loginHandler from "~server/rest/routes/login/loginHandler/loginHandler";
import addPageHandler from "~server/rest/routes/page/addPageHandler/addPageHandler";
import deletePageHandler from "~server/rest/routes/page/deletePageHandler/deletePageHandler";
import getPageHandler from "~server/rest/routes/page/getPageHandler/getPageHandler";
import updatePageHandler from "~server/rest/routes/page/updatePageHandler/updatePageHandler";
import addPostHandler from "~server/rest/routes/post/addPostHandler/addPostHandler";
import deletePostHandler from "~server/rest/routes/post/deletePostHandler/deletePostHandler";
import getPostHandler from "~server/rest/routes/post/getPostHandler/getPostHandler";
import updatePostHandler from "~server/rest/routes/post/updatePostHandler/updatePostHandler";
import getPostsHandler from "~server/rest/routes/posts/getPostsHandler/getPostsHandler";
import addUserHandler from "~server/rest/routes/user/addUserHandler/addUserHandler";
import deleteUserHandler from "~server/rest/routes/user/deleteUserHandler/deleteUserHandler";
import updateUserHandler from "~server/rest/routes/user/updateUserHandler/updateUserHandler";
import verifyTokenHandler from "~server/rest/routes/verifyTokenHandler/verifyTokenHandler";
import getWeather from "../../routes/weather/getWeather/getWeather";

type ApplyRoutesArguments = {
  instance: Express;
};

type ApplyRoutes = (argument: ApplyRoutesArguments) => void;

const applyRoutes: ApplyRoutes = ({ instance }: ApplyRoutesArguments): void => {
  instance.post(Routes.User, addUserHandler);
  instance.post(Routes.Login, loginHandler);
  instance.get(Routes.PostWithId, getPostHandler);
  instance.delete(Routes.PostWithId, deletePostHandler);
  instance.post(Routes.Post, addPostHandler);
  instance.put(Routes.PostWithId, updatePostHandler);
  instance.delete(Routes.UserWithId, deleteUserHandler);
  instance.put(Routes.UserWithId, updateUserHandler);
  instance.post(Routes.VerifyToken, verifyTokenHandler);
  instance.get(Routes.Posts, getPostsHandler);
  instance.get(Routes.PageWithName, getPageHandler);
  instance.post(Routes.Page, addPageHandler);
  instance.put(Routes.PageWithName, updatePageHandler);
  instance.delete(Routes.PageWithName, deletePageHandler);
  instance.get(Routes.Weather, getWeather);
};

export default applyRoutes;
