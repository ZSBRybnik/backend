import getNodeLoader from "~backend/source/scripts/build/loaders/getNodeLoader/getNodeLoader";

describe("getNodeLoader", () => {
  it("should match Native Modules", () => {
    const { test } = getNodeLoader();
    const testRegex = test.toString();
    expect(testRegex).toContain("node");
  });
});
