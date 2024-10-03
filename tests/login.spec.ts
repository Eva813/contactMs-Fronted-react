import { test, expect } from '@playwright/test';
import { config } from 'dotenv';
// 讀取 .env 文件
config();
test('test', async ({ page }) => {

  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Enter Email').click();
  await page.getByPlaceholder('Enter Email').fill(process.env.TEST_EMAIL);
  await page.getByText('Password:').click();
  await page.getByPlaceholder('********').click();
  await page.getByPlaceholder('********').fill(process.env.TEST_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Contact Dashboard' }).click();
  // 驗證是否成功進入 Dashboard
  await expect(page).toHaveURL('/dashboard');

});