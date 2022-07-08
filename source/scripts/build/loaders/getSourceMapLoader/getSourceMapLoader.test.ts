import getSourceMapLoader from "~scripts/build/loaders/getSourceMapLoader/getSourceMapLoader";

describe("getSourceMapLoader", () => {
  it("should exclude node_modules", () => {
    const { exclude } = getSourceMapLoader();
    expect(exclude).toStrictEqual(/(node_modules)/);
  });
  it("should match JavaScript", () => {
    const { test } = getSourceMapLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("js");
  });
  it("should be enforced as pre", () => {
    const { enforce } = getSourceMapLoader();
    expect(enforce).toContain("pre");
  });
  it("should use source-map-loader as the loader", () => {
    const { use } = getSourceMapLoader();
    expect(use).toContain("source-map-loader");
  });
});
