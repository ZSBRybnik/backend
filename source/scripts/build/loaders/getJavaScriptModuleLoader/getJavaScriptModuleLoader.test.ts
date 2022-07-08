import getJavaScriptModuleLoader from "~scripts/build/loaders/getJavaScriptModuleLoader/getJavaScriptModuleLoader";

describe("getJavaScriptModuleLoader", () => {
  it("should match JavaScript Modules", () => {
    const { test } = getJavaScriptModuleLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("m?js");
  });
  it("shouldn't be resolve fully specified", () => {
    const {
      resolve: { fullySpecified },
    } = getJavaScriptModuleLoader();
    expect(fullySpecified).toBe(false);
  });
});
