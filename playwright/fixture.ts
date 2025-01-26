// playwright/fixtures.ts
import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { testData } from '../testdata';
import type { UserData } from '../type';

const validAccounts = testData.filter(user => user.expectedResult === 'success');

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [async ({ browser }, use) => {
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      await use(fileName);
      return;
    }

    if (id >= validAccounts.length) {
      throw new Error(`Not enough valid accounts for worker ${id}. Add more valid users to testData.`);
    }

    const account = validAccounts[id];
    const page = await browser.newPage({ storageState: undefined });

    // Perform login for valid tests
    await page.goto('/login');
    await page.fill('#input-0', account.email);
    await page.fill('#input-2', account.password);
    await page.click('.v-btn');
    
    // Wait for successful login redirect
    await page.waitForURL('https://rapidreach-develop.magedge.com/');

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});