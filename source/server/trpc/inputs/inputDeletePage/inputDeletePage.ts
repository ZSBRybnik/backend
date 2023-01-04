import { object as zodObject, string as zodString } from "zod";

const inputDeletePost = () => {
  return zodObject({
    name: zodString(),
  });
};
export default inputDeletePost;
