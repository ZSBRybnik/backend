import {
  null as zodNull,
  number as zodNumber,
  object as zodObject,
  string as zodString,
  union as zodUnion,
} from "zod";

const outputUpdatePost = () => {
  return zodUnion([
    zodObject({
      id: zodNumber(),
      title: zodString(),
      content: zodString(),
      author: zodString(),
      brief: zodString(),
    }),
    zodNull(),
  ]);
};

export default outputUpdatePost;
