import { object as zodObject, string as zodString } from "zod";

const inputAddPage = () => {
  return zodObject({
    name: zodString(),
    title: zodString(),
    content: zodString(),
  });
};
export default inputAddPage;
