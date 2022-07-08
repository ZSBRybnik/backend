import { $ } from "zx";

(async (): Promise<void> => {
  await $`eslint --fix -f unix "./**/*.{js,jsx,ts,tsx,json}" && prettier --write "./**/*.{js,jsx,ts,tsx,json,prisma,yaml,yml,pug}"`;
})();
