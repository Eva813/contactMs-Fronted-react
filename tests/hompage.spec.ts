import { test, expect } from '@playwright/test';


test('should navigate to the home page', async ({ page }) => {
  await page.goto('/'); // Replace with your actual home page URL
  // 進到頁面，檢查是否有 airial-label 為 Return to homepage 的元素
  await page.getByLabel('Return to homepage');
});