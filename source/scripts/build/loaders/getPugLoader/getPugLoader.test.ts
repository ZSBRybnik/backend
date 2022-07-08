import getPugLoader from "~scripts/build/loaders/getPugLoader/getPugLoader";

describe("getPugLoader", () => {
  it("should match Pug", () => {
    const { test } = getPugLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("pug");
  });
});
