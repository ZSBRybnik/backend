import { access as accessWithCallback, mkdir as mkdirWithCallback } from "fs";
import { platform } from "os";
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
    const os: NodeJS.Platform = platform();
    if (os === "win32") {
      $.shell = "cmd";
      $.prefix = "";
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
