import "dotenv/config";
import { parse, stringify } from "envfile";
import { Collection, CreateCollection, CreateIndex } from "faunadb";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { launch } from "puppeteer";

const submitSelector = "button[type=submit]";
(async () => {
  const browser = await launch({
    headless: false,
  });
  const page = (await browser.pages())[0];
  await page.goto("https://dashboard.fauna.com/accounts/login");
  const emailInput = await page.waitForSelector("#email");
  await emailInput?.type(process.env.FAUNADB_USERNAME || "");
  const passwordInput = await page.waitForSelector("#password");
  await passwordInput?.type(process.env.FAUNADB_PASSWORD || "");
  const submitButton = await page.waitForSelector(submitSelector);
  await submitButton?.click();
  const createDatabaseButton = await page.waitForSelector(
    ".databases-panel__header > span",
  );
  await createDatabaseButton?.click();
  const nameInput = await page.waitForSelector("#name");
  await nameInput?.type("zsbrybnik");
  const regionSelect = await page.waitForSelector(".react-select__control");
  await regionSelect?.click();
  const classicOption = await page.waitForSelector("div[data-testid=global]");
  await classicOption?.click();
  const createButton = await page.waitForSelector(submitSelector);
  await createButton?.click();
  await page.goto("https://dashboard.fauna.com/keys-new/@db/global/zsbrybnik");
  const keyNameInput = await page.waitForSelector("#name");
  await keyNameInput?.type("backend");
  const saveButton = await page.waitForSelector(submitSelector);
  await saveButton?.click();
  await page.waitForSelector("div[data-testid=secret]");
  const key: string = (await page.evaluate(() => {
    const keyWrapper = document.querySelector("div[data-testid=secret]");
    return Promise.resolve(keyWrapper?.textContent);
  }, {})) as string;
  try {
    await browser.close();
  } catch {
    console.log("");
  }
  const file = readFileSync(join(process.cwd(), ".env")).toString();
  const parsedEnvFile = parse(file);
  parsedEnvFile.FAUNADB_KEY = key;
  writeFileSync(join(process.cwd(), ".env"), stringify(parsedEnvFile));
  const { default: faunaDBClient } = await import(
    "~backend/source/server/clients/faunaClient/faunaClient"
  );
  const createSubpagesCollectionPromise = faunaDBClient.query(
    CreateCollection({
      name: "pages",
      history_days: 0,
    }),
  );
  const createPostsCollectionPromise = faunaDBClient.query(
    CreateCollection({
      name: "posts",
      history_days: 0,
    }),
  );

  await Promise.all([
    createSubpagesCollectionPromise,
    createPostsCollectionPromise,
  ]);

  const createSubpageByNameIndexPromise = faunaDBClient.query(
    CreateIndex({
      name: "subpage_by_name",
      source: Collection("pages"),
      terms: [{ field: ["data", "name"] }],
    }),
  );

  const createPostByIdIndexPromise = faunaDBClient.query(
    CreateIndex({
      name: "post_by_id",
      source: Collection("posts"),
      terms: [{ field: ["data", "id"] }],
    }),
  );

  await Promise.all([
    createSubpageByNameIndexPromise,
    createPostByIdIndexPromise,
  ]);
})();
