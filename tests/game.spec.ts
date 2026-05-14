import { test, expect } from '@playwright/test'

async function openAndStartGame(page: import('@playwright/test').Page, cardSelector = '.task-card') {
  await page.goto('/')
  await page.waitForSelector('.task-card')
  await page.locator(cardSelector).first().click()
  await page.locator('.dialog-start-btn').click()
}

test.describe('Game setup and play', () => {
  test('opens setup dialog when task card clicked', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.task-card')
    await page.locator('.task-card').first().click()
    await expect(page.locator('.dialog')).toBeVisible()
    await expect(page.locator('.dialog-title')).toBeVisible()
  })

  test('dialog has question count and mode options', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.task-card')
    await page.locator('.task-card').first().click()
    await expect(page.locator('.dialog-opt-btn').first()).toBeVisible()
    await expect(page.locator('.dialog-start-btn')).toBeVisible()
    await expect(page.locator('.dialog-cancel-btn')).toBeVisible()
  })

  test('cancel closes the dialog', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.task-card')
    await page.locator('.task-card').first().click()
    await page.locator('.dialog-cancel-btn').click()
    await expect(page.locator('.dialog')).not.toBeVisible()
    await expect(page.locator('.task-card').first()).toBeVisible()
  })

  test('start launches a game screen', async ({ page }) => {
    await openAndStartGame(page)
    await expect(page.locator('.game-screen, .seq-screen, [class*="game"]').first()).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Subtraction game', () => {
  test.beforeEach(async ({ page }) => {
    await openAndStartGame(page, '.task-card.cat-sub')
  })

  test('shows a game screen with a level badge', async ({ page }) => {
    await expect(page.locator('.game-screen')).toBeVisible()
    await expect(page.locator('.level-badge')).toBeVisible()
  })

  test('shows answer inputs', async ({ page }) => {
    await expect(page.locator('.col-input, .answer-input-inline, input').first()).toBeVisible({ timeout: 5000 })
  })

  test('check button is present', async ({ page }) => {
    await expect(page.locator('.check-btn, button').filter({ hasText: /check|kontrollera|tarkista|✓/i }).first()).toBeVisible()
  })
})

test.describe('Addition game', () => {
  test('addition level opens with inputs', async ({ page }) => {
    await openAndStartGame(page, '.task-card.cat-add')
    await expect(page.locator('.game-screen')).toBeVisible()
    await expect(page.locator('.col-input, .std-input, input').first()).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Sequence game', () => {
  test('sequence level opens and shows inputs', async ({ page }) => {
    await openAndStartGame(page, '.task-card.cat-seq')
    await expect(page.locator('.seq-input, input').first()).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Measurement game', () => {
  test('measurement level opens', async ({ page }) => {
    await openAndStartGame(page, '.task-card.cat-measure')
    await expect(page.locator('input').first()).toBeVisible({ timeout: 5000 })
  })
})
