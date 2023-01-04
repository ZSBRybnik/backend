import {
  number as zodNumber,
  object as zodObject,
  string as zodString,
} from "zod";

const inputUpdatePage = () => {
  return zodObject({
    id: zodNumber(),
    title: zodString(),
    content: zodString(),
    name: zodString(),
  });
};
export default inputUpdatePage;
