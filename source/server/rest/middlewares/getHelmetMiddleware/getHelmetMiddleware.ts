import helmet from "helmet";

const getHelmetMiddleware = () => {
  return helmet();
};

export default getHelmetMiddleware;
