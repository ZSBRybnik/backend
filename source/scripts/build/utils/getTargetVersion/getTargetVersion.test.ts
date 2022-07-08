import getTargetVersion from "~scripts/build/utils/getTargetVersion/getTargetVersion";

describe("getTargetVersion", () => {
  it("returns target to modern browsers", () => {
    const targetVersion = getTargetVersion({
      targetToModern: true,
    });
    expect(targetVersion).toBe(
      "last 2 Chrome versions, last 2 Firefox versions, not Firefox < 60, not Chrome < 60",
    );
  });
  it("returns target to legacy browsers", () => {
    const targetVersion = getTargetVersion({
      targetToModern: false,
    });
    expect(targetVersion).toBe("> 0.25%, not dead");
  });
});
