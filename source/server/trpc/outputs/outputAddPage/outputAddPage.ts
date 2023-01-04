import {
  null as zodNull,
  number as zodNumber,
  object as zodObject,
  string as zodString,
  union as zodUnion,
} from "zod";

const outputAddPage = () => {
  return zodUnion([
    zodObject({
      id: zodNumber(),
      title: zodString(),
      content: zodString(),
      name: zodString(),
    }),
    zodNull(),
  ]);
};

export default outputAddPage;
