import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/JobAd/);
  await expect(page.locator('#step1')).toBeVisible();
});

test('mobile input triggers auto-check', async ({ page }) => {
  await page.goto('/');
  await page.fill('#mobile', '9876543210');
  await page.waitForTimeout(500);
  await expect(page.locator('#step2')).toBeVisible();
});

test('login form works', async ({ page }) => {
  await page.goto('/');
  await page.fill('#mobile', '9876543210');
  await page.waitForTimeout(500);
  await page.fill('#pin', '1234');
  await page.click('#submitBtn');
});

test('profile page accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#profile-page')).toBeVisible();
});

test('post job page accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#postjob-page')).toBeVisible();
});
