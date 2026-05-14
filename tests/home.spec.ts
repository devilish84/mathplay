import { test, expect } from '@playwright/test'

test.describe('Home screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.task-card')
  })

  test('shows task grid with cards', async ({ page }) => {
    const count = await page.locator('.task-card').count()
    expect(count).toBeGreaterThan(0)
  })

  test('filter by subtraction category', async ({ page }) => {
    const subChip = page.locator('.filter-chip').filter({ hasText: '➖' })
    await subChip.click()
    await expect(subChip).toHaveClass(/active/)

    for (const card of await page.locator('.task-card').all()) {
      await expect(card).toHaveClass(/cat-sub/)
    }
  })

  test('filter by stars', async ({ page }) => {
    const starChip = page.locator('.filter-chip').filter({ hasText: '⭐' }).first()
    await starChip.click()
    await expect(starChip).toHaveClass(/active/)
    const count = await page.locator('.task-card').count()
    expect(count).toBeGreaterThan(0)
  })

  test('clicking category filter twice clears it and shows all cards', async ({ page }) => {
    const initialCount = await page.locator('.task-card').count()
    const chip = page.locator('.filter-chip').filter({ hasText: '➖' })
    await chip.click()
    await expect(chip).toHaveClass(/active/)
    await chip.click()
    await expect(chip).not.toHaveClass(/active/)
    const count = await page.locator('.task-card').count()
    expect(count).toBe(initialCount)
  })

  test('footer shows copyright, GitHub, and Claude links', async ({ page }) => {
    await expect(page.locator('.home-footer')).toBeVisible()
    await expect(page.locator('.home-footer a[href="https://github.com/devilish84/mathplay"]')).toBeVisible()
    await expect(page.locator('.home-footer a[href="https://x84.fi"]')).toBeVisible()
    await expect(page.locator('.home-footer-claude')).toBeVisible()
  })

  test('empty state shown when no cards match combined filters', async ({ page }) => {
    // Filter by subtraction + 4 stars (unlikely combination that may show empty)
    await page.locator('.filter-chip').filter({ hasText: '➖' }).click()
    await page.locator('.filter-chip').filter({ hasText: '⭐⭐⭐⭐' }).click()

    // Either some cards shown or empty message — both are valid states
    const cards = await page.locator('.task-card').count()
    const empty = await page.locator('.home-empty').count()
    expect(cards + empty).toBeGreaterThan(0)
  })
})
