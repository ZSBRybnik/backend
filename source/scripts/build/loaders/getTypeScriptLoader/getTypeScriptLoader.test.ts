import { sep } from "path";
import source from "~backend/source/scripts/build/constants/source/source";
import getTypeScriptLoader from "~backend/source/scripts/build/loaders/getTypeScriptLoader/getTypeScriptLoader";

describe("getTypeScriptLoader", () => {
  it("should exclude node_modules", () => {
    const { exclude } = getTypeScriptLoader();
    expect(exclude).toStrictEqual(/(node_modules)/);
  });
  it("should inlucde codebase", () => {
    const { include } = getTypeScriptLoader();
    const lastFolders: (string | undefined)[] = include.map((folderPath) => {
      return folderPath.split(sep).pop();
    });
    expect(lastFolders).toContain(source);
  });
  it("should match TypeScript", () => {
    const { test } = getTypeScriptLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("ts");
  });
  it("should match TypeScript with JSX", () => {
    const { test } = getTypeScriptLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("tsx");
  });
  it("should match JavaScript", () => {
    const { test } = getTypeScriptLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("js");
  });
  it("should use babel-loader as the loader", () => {
    const { use } = getTypeScriptLoader();
    const { loader } = use[0];
    expect(loader).toStrictEqual("babel-loader");
  });
});
