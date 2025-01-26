// playwright/fixtures.ts
import { test as baseTest } from "@playwright/test";
import fs from "fs";
import path from "path";
import { testData } from "../data/testdata";

const validAccounts = testData.filter(
  (user) => user.expectedResult === "success"
);

/*
 * This fixture.ts file is used for extend built-in test fixtures
 * such as,to share common setup/teardown logic,encapsulate functionality,
 * override default behavior. Each worker gets its own test account
 * and authentication state is saved and reused for all tests within the same worker
 * This ensures that tests running in parallel don't interfere with each other
 * In this project, we don't need it, since we are only testing Log in functionality
 * but if we wanted to use authenticaed users furthermore,this approach would be the best.
 */

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      if (id >= validAccounts.length) {
        throw new Error(
          `Not enough valid accounts for worker ${id}. Add more valid users to testData.`
        );
      }

      const account = validAccounts[id];
      const page = await browser.newPage({ storageState: undefined });

      // Perform login for valid tests
      await page.goto("/login");
      await page.fill("#input-0", account.email);
      await page.fill("#input-2", account.password);
      await page.click(".v-btn");

      // Wait for successful login redirect
      await page.waitForURL("https://rapidreach-develop.magedge.com/");

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
