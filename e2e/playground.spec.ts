import { test, expect } from '@playwright/test'

test.describe('Playground', () => {
  test('shows word, character, and line counts when typing', async ({ page }) => {
    await page.goto('/playground')

    await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible()

    const textarea = page.getByRole('textbox', { name: 'Text input' })
    await textarea.fill('hello world')

    await expect(page.getByText('Words: 2')).toBeVisible()
    await expect(page.getByText('Characters: 11')).toBeVisible()
    await expect(page.getByText('Lines: 1')).toBeVisible()
  })

  test('Copy button is disabled when textarea is empty', async ({ page }) => {
    await page.goto('/playground')

    const copyButton = page.getByRole('button', { name: 'Copy' })
    await expect(copyButton).toBeDisabled()
  })
})
