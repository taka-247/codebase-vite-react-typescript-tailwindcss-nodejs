// Note: ToastMessage can be detected as test is per page while Dashboard.test.ts cannot - see there
import { test, expect } from '@playwright/test'
import { Shared } from '@app/shared'

test('Test if successMessage is shown when button is clicked', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: Shared.pages.dashboard.buttonText }).click()
  await expect(page.getByText(Shared.api.test.successMessage)).toBeVisible()
})
