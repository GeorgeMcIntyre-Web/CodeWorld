import { test, expect } from '@playwright/test'

test.describe('Settings', () => {
  test('theme toggle switches between dark and light', async ({ page }) => {
    await page.goto('/settings')

    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

    const themeSelect = page.getByRole('combobox', { name: 'Theme' })
    await expect(themeSelect).toHaveValue('dark')

    await themeSelect.selectOption('light')
    await expect(themeSelect).toHaveValue('light')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

    await themeSelect.selectOption('dark')
    await expect(themeSelect).toHaveValue('dark')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
})
