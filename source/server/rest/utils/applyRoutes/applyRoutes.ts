import type { Express } from "express";
import Routes from "~server/rest/constants/routes/routes";
import loginHandler from "~server/rest/routes/login/loginHandler/loginHandler";
import addPostHandler from "~server/rest/routes/post/addPostHandler/addPostHandler";
import deletePostHandler from "~server/rest/routes/post/deletePostHandler/deletePostHandler";
import getPostHandler from "~server/rest/routes/post/getPostHandler/getPostHandler";
import updatePostHandler from "~server/rest/routes/post/updatePostHandler/updatePostHandler";
import addUserHandler from "~server/rest/routes/user/addUserHandler/addUserHandler";
import deleteUserHandler from "~server/rest/routes/user/deleteUserHandler/deleteUserHandler";

type ApplyRoutesArguments = {
  instance: Express;
};

type ApplyRoutes = (argument: ApplyRoutesArguments) => void;

const applyRoutes: ApplyRoutes = ({ instance }: ApplyRoutesArguments): void => {
  instance.post(Routes.User, addUserHandler);
  instance.post(Routes.Login, loginHandler);
  instance.get(Routes.Post, getPostHandler);
  instance.delete(Routes.Post, deletePostHandler);
  instance.post(Routes.Post, addPostHandler);
  instance.put(Routes.Post, updatePostHandler);
  instance.put(Routes.UserWithId, deleteUserHandler);
};

export default applyRoutes;
