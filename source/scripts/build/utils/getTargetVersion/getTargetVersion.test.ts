import getTargetVersion from "~backend/source/scripts/build/utils/getTargetVersion/getTargetVersion";

describe("getTargetVersion", () => {
  it("returns target to modern browsers", () => {
    const targetVersion = getTargetVersion();
    expect(targetVersion).toBe("current");
  });
  it("returns target to legacy browsers", () => {
    const targetVersion = getTargetVersion();
    expect(targetVersion).toBe("current");
  });
});
