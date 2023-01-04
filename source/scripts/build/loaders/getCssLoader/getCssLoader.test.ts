import getCssLoader from "~backend/source/scripts/build/loaders/getCssLoader/getCssLoader";

describe("getCssLoader", () => {
  it("should match CSS", () => {
    const { test } = getCssLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("css");
  });
  it("should match SCSS", () => {
    const { test } = getCssLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("scss");
  });
  it("should match SASS", () => {
    const { test } = getCssLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("sass");
  });
  it("should use style-loader as a loader", () => {
    const { use } = getCssLoader();
    expect(use).toContain("style-loader");
  });
  it("should use css-loader as a loader", () => {
    const { use } = getCssLoader();
    expect(use).toContain("css-loader");
  });
  it("should use sass-loader as a loader", () => {
    const { use } = getCssLoader();
    expect(use).toContain("sass-loader");
  });
});
