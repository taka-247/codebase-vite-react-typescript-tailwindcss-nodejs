// Note: ToastMessage can be detected as test is per page while Dashboard.test.ts cannot - see there
import { test, expect } from '@playwright/test'
import { Shared } from '@app/shared'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !process.env.TEST_EMAIL || !process.env.TEST_PASSWORD,
      'Skipped: TEST_EMAIL / TEST_PASSWORD secrets not configured'
    )

    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.TEST_EMAIL!)
    await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!)
    await page.getByRole('button', { name: 'Log in' }).click()
    await page.waitForURL('/')
  })

  test('successMessage is shown when button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: Shared.pages.dashboard.buttonText }).click()
    await expect(page.getByText(Shared.api.test.successMessage)).toBeVisible()
  })
})
