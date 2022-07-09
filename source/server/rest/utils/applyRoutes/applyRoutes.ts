import type { Express } from "express";
import Routes from "~server/rest/constants/routes/routes";
import loginHandler from "~server/rest/routes/login/loginHandler/loginHandler";
import addUserHandler from "~server/rest/routes/user/addUserHandler/addUserHandler";

type ApplyRoutesArguments = {
  instance: Express;
};

type ApplyRoutes = (argument: ApplyRoutesArguments) => void;

const applyRoutes: ApplyRoutes = ({ instance }: ApplyRoutesArguments): void => {
  instance.post(Routes.User, addUserHandler);
  instance.post(Routes.Login, loginHandler);
};

export default applyRoutes;
