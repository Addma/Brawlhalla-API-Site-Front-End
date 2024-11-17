const { test, expect } = require('@playwright/test');

test('move to about', async ({page}) => {
    await page.goto('http://localhost:3000');

    await page.click('text=About');

    await expect(page).toHaveURL('http://localhost:3000/about');
})

test('home button reset', async ({page}) => {
    await page.click("")
})