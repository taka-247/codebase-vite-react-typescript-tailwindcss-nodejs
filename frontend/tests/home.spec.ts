import { test, expect } from '@playwright/test'

test('shows message after API test button click', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Test API' }).click()
  await expect(page.getByText('Hello from backend!')).toBeVisible()
})
