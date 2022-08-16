import { number as zodNumber, object as zodObject } from "zod";

const inputDeletePost = () => {
  return zodObject({
    id: zodNumber(),
  });
};
export default inputDeletePost;
