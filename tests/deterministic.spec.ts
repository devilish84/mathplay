/**
 * Deterministic tests using a seeded PRNG injected via window.__rng.
 *
 * The LCG produces the same question every run, so tests can assert
 * specific answers instead of reading them dynamically from the DOM.
 *
 * Seed 42 with this LCG gives:
 *   Subtraction lv1 (gen1): rand(1,5)=2 → b=2, rand(0,5)=0 → a=2, answer=0
 *   Multiplication m2: a=2, rand(1,10)=3 → 2×3=6
 *   Measurement cm_mm (index=0): rand(1,50)=13 → 13 cm = 130 mm
 */

import { test, expect } from '@playwright/test'

/** LCG matching src/rng.ts injected seeded PRNG */
function makeLcg(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 2 ** 32
    return seed / 2 ** 32
  }
}

/** Inject a seeded RNG before the page loads */
async function injectRng(page: import('@playwright/test').Page, seed = 42) {
  await page.addInitScript((s) => {
    let state = s
    window.__rng = () => {
      state = (state * 1664525 + 1013904223) % 2 ** 32
      return state / 2 ** 32
    }
  }, seed)
}

async function startGame(
  page: import('@playwright/test').Page,
  cardSelector: string,
) {
  await page.goto('/')
  await page.waitForSelector('.task-card')
  await page.locator(cardSelector).first().click()
  await page.locator('.dialog-start-btn').click()
}

// ── Subtraction ──────────────────────────────────────────────────────────────

test.describe('Deterministic subtraction lv1', () => {
  test.beforeEach(async ({ page }) => {
    await injectRng(page, 42)
    await startGame(page, '.task-card.cat-sub')
  })

  test('correct answer scores a point', async ({ page }) => {
    // seed=42: b=rand(1,5)=2, a=b+rand(0,5)=2+0=2 → 2-2=0
    const rng  = makeLcg(42)
    const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
    const b = rand(1, 5)
    const a = b + rand(0, 5)
    const answer = a - b

    const input = page.locator('.answer-input-inline, .std-input, input').first()
    await input.fill(String(answer))
    await page.locator('.check-btn').click()
    await expect(page.locator('.feedback.correct')).toBeVisible()
  })

  test('wrong answer shows wrong feedback', async ({ page }) => {
    const rng  = makeLcg(42)
    const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
    const b = rand(1, 5)
    const a = b + rand(0, 5)
    const wrong = (a - b) + 1

    const input = page.locator('.answer-input-inline, .std-input, input').first()
    await input.fill(String(wrong))
    await page.locator('.check-btn').click()
    await expect(page.locator('.feedback.wrong')).toBeVisible()
  })
})

// ── Multiplication ───────────────────────────────────────────────────────────

test.describe('Deterministic multiplication m2 (2× table)', () => {
  test.beforeEach(async ({ page }) => {
    await injectRng(page, 42)
    // m2 is the 3rd card in cat-mul (after m1, m10) — select by text
    await page.goto('/')
    await page.waitForSelector('.task-card')
    await page.locator('.task-card.cat-mul').filter({ hasText: '2×' }).first().click()
    await page.locator('.dialog-start-btn').click()
  })

  test('correct answer scores a point', async ({ page }) => {
    // seed=42: a=2, b=rand(1,10)=3 → 2×3=6
    const rng  = makeLcg(42)
    const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
    const b = rand(1, 10)
    const answer = 2 * b

    const input = page.locator('.std-input, input[type="text"]').first()
    await input.fill(String(answer))
    await page.locator('.check-btn').click()
    await expect(page.locator('.feedback.correct')).toBeVisible()
  })
})

// ── Measurement ──────────────────────────────────────────────────────────────

test.describe('Deterministic measurement cm↔mm', () => {
  test.beforeEach(async ({ page }) => {
    await injectRng(page, 42)
    await page.goto('/')
    await page.waitForSelector('.task-card')
    await page.locator('.task-card.cat-measure').filter({ hasText: 'cm' }).first().click()
    await page.locator('.dialog-start-btn').click()
  })

  test('correct answer scores a point', async ({ page }) => {
    // seed=42, index=0 (forward): cm=rand(1,50)=13 → answer=130 mm
    const rng  = makeLcg(42)
    const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
    const cm = rand(1, 50)
    const answer = cm * 10

    const input = page.locator('input').first()
    await input.fill(String(answer))
    await page.locator('.check-btn').click()
    await expect(page.locator('.feedback.correct')).toBeVisible()
  })

  test('wrong answer does not score', async ({ page }) => {
    const rng  = makeLcg(42)
    const rand = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min
    const cm = rand(1, 50)
    const wrong = cm * 10 + 1

    const input = page.locator('input').first()
    await input.fill(String(wrong))
    await page.locator('.check-btn').click()
    await expect(page.locator('.feedback.wrong')).toBeVisible()
  })
})
