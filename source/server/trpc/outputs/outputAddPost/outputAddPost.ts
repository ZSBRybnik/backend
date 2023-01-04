import {
  null as zodNull,
  number as zodNumber,
  object as zodObject,
  string as zodString,
  union as zodUnion,
} from "zod";

const outputAddPost = () => {
  return zodUnion([
    zodObject({
      id: zodNumber(),
      title: zodString(),
      author: zodString(),
      content: zodString(),
      brief: zodString().optional(),
    }),
    zodNull(),
  ]);
};

export default outputAddPost;
