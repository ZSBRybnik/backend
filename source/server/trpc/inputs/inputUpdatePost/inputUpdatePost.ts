import {
  number as zodNumber,
  object as zodObject,
  string as zodString,
} from "zod";

const inputUpdatePost = () => {
  return zodObject({
    id: zodNumber(),
    title: zodString(),
    content: zodString(),
    author: zodString(),
    brief: zodString(),
  });
};
export default inputUpdatePost;
