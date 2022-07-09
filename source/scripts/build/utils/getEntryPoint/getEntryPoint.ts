import path from "path";
import source from "~scripts/build/constants/source/source";

const getEntryPoint = (): string => {
  return path.join(process.cwd(), source, "server", "index.ts");
};

export default getEntryPoint;
