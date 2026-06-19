import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/JobAd/);
});

test('login flow works', async ({ page }) => {
  await page.goto('/');
  await page.fill('#mobile', '9876543210');
  await page.waitForTimeout(500);
  await expect(page.locator('#step2')).toBeVisible();
});

test('profile page accessible', async ({ page }) => {
  await page.goto('/');
  // Check if profile section exists
  await expect(page.locator('#profile-page')).toBeVisible();
});
