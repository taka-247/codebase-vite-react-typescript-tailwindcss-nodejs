import { test, expect } from '@playwright/test'
import { Shared } from '@app/shared'

test('shows message after API test button click', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: Shared.pages.home.buttonText }).click()
  await expect(page.getByText(Shared.api.test.message)).toBeVisible()
})
