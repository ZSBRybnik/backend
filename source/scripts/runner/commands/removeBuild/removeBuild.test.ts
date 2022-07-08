import { access as accessWithCallback, mkdir as mkdirWithCallback } from "fs";
import { join } from "path";
import { promisify } from "util";
import { $ } from "zx";
import destination from "~scripts/build/constants/destination/destination";

const access = promisify(accessWithCallback);
const mkdir = promisify(mkdirWithCallback);

describe("removeBuild", (): void => {
  it("works properly", async (): Promise<void> => {
    try {
      await access(join(process.cwd(), destination));
    } catch {
      await mkdir(join(process.cwd(), destination));
    }
    $.verbose = false;
    await $`yarn run remove-build`;
    try {
      await access(join(process.cwd(), destination));
      expect(true).toBe(false);
    } catch {
      expect(true).toBe(true);
    }
  });
});
