import { arch, platform } from "os";
import { $ } from "zx";

type GolangOutputFilExtensioneMapper = {
  [key in NodeJS.Platform]?: string;
};

type GolangOSMapper = {
  [key in NodeJS.Platform]?: string;
};

type GolangArchMapper = {
  [key: string]: string;
};

(async () => {
  const architecture: string = arch();
  const os: NodeJS.Platform = platform();
  if (os === "win32") {
    $.shell = "cmd";
    $.prefix = "";
  }
  const golangOutputFilExtensioneMapper: GolangOutputFilExtensioneMapper = {
    win32: "dll",
    darwin: "so",
    linux: "so",
  };
  const golangArchMapper: GolangArchMapper = {
    x64: "amd64",
    arm64: "arm64",
  };
  const golangOSMapper: GolangOSMapper = {
    darwin: "darwin",
    linux: "linux",
    win32: "windows",
  };
  await $`cross-env GOOS=${golangOSMapper[os]} GOARCH=${golangArchMapper[architecture]} go build -o ./destination/index.${golangOutputFilExtensioneMapper[os]} -buildmode=c-shared main.go`;
})();
