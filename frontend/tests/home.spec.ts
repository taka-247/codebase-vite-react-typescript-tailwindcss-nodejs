// Note: ToastMessage can be detected as test is per page while Home.test.ts cannot - see there
import { test, expect } from '@playwright/test'
import { Shared } from '@app/shared'

test('Test if successMessage is shown when button is clicked', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: Shared.pages.home.buttonText }).click()
  await expect(page.getByText(Shared.api.test.successMessage)).toBeVisible()
})
