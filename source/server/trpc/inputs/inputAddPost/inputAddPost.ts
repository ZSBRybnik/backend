import { object as zodObject, string as zodString } from "zod";

const inputAddPost = () => {
  return zodObject({
    title: zodString(),
    author: zodString(),
    content: zodString(),
    brief: zodString().optional(),
  });
};
export default inputAddPost;
