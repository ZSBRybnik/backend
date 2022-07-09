import getTargetVersion from "~scripts/build/utils/getTargetVersion/getTargetVersion";

describe("getTargetVersion", () => {
  it("returns target to modern browsers", () => {
    const targetVersion = getTargetVersion();
    expect(targetVersion).toBe(
      "last 2 Chrome versions, last 2 Firefox versions, not Firefox < 60, not Chrome < 60",
    );
  });
  it("returns target to legacy browsers", () => {
    const targetVersion = getTargetVersion();
    expect(targetVersion).toBe("> 0.25%, not dead");
  });
});
