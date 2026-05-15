/**
 * Known-question tests.
 *
 * Each suite injects a seeded PRNG so the game produces a pre-computed
 * question sequence (see tests/fixtures.ts). Tests answer all 10 questions
 * in order and take a screenshot after every answer — correct and wrong
 * alike — so the full session is visually documented.
 *
 * Screenshot naming:   {suite}/{question-label}/{correct|wrong}.png
 * Screenshot folder:   test-results/known-questions/
 */

import { test, expect, type Page } from '@playwright/test'
import {
  SUB_LV1, ADD_LV1, MUL_M2, MEASURE_CM_MM, SEQ_E,
  type QA, type MeasureQA, type SeqQA,
} from './fixtures'

// ── RNG injection ────────────────────────────────────────────────────────────

function injectSeed(page: Page, seed: number) {
  return page.addInitScript((s: number) => {
    let state = s
    window.__rng = () => {
      state = (state * 1664525 + 1013904223) % 2 ** 32
      return state / 2 ** 32
    }
  }, seed)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function openLevel(page: Page, catClass: string, titleFragment: RegExp | string) {
  await page.goto('/')
  await page.waitForSelector('.task-card')
  await page.locator(`.task-card.${catClass}`).filter({ hasText: titleFragment }).first().click()
  await page.locator('.dialog-start-btn').click()
}

async function screenshot(page: Page, name: string) {
  await page.screenshot({
    path: `test-results/known-questions/${name}.png`,
    fullPage: false,
  })
}

// ── SUB lv1 — Pienet luvut ───────────────────────────────────────────────────

test.describe('SUB lv1 — Pienet luvut', () => {
  test.beforeEach(async ({ page }) => {
    await injectSeed(page, 1001)
    await openLevel(page, 'cat-sub', /pienet luvut|small numbers/i)
  })

  for (let qi = 0; qi < SUB_LV1.length; qi++) {
    const q = SUB_LV1[qi]
    const label = `q${qi + 1}: ${q.a}−${q.b}=${q.ans}`

    test(`[correct] ${label}`, async ({ page }) => {
      // Skip to question qi by answering all previous correctly
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
        await input.fill(String(SUB_LV1[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
      await input.fill(String(q.ans))
      await page.locator('.check-btn').click()
      await screenshot(page, `sub-lv1/${label.replace(/[^a-z0-9]/gi, '_')}/correct`)
      await expect(page.locator('.feedback.correct')).toBeVisible()
    })

    test(`[wrong]   ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
        await input.fill(String(SUB_LV1[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
      await input.fill(String(q.ans + 1))
      await page.locator('.check-btn').click()
      await screenshot(page, `sub-lv1/${label.replace(/[^a-z0-9]/gi, '_')}/wrong`)
      await expect(page.locator('.feedback.wrong')).toBeVisible()
    })
  }
})

// ── ADD lv1 — Pienet luvut ───────────────────────────────────────────────────

test.describe('ADD lv1 — Pienet luvut', () => {
  test.beforeEach(async ({ page }) => {
    await injectSeed(page, 2001)
    await openLevel(page, 'cat-add', /pienet luvut|small numbers/i)
  })

  for (let qi = 0; qi < ADD_LV1.length; qi++) {
    const q = ADD_LV1[qi]
    const label = `q${qi + 1}: ${q.a}+${q.b}=${q.ans}`

    test(`[correct] ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
        await input.fill(String(ADD_LV1[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
      await input.fill(String(q.ans))
      await page.locator('.check-btn').click()
      await screenshot(page, `add-lv1/${label.replace(/[^a-z0-9]/gi, '_')}/correct`)
      await expect(page.locator('.feedback.correct')).toBeVisible()
    })

    test(`[wrong]   ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
        await input.fill(String(ADD_LV1[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.answer-input-inline, .std-input, input[type="text"]').first()
      await input.fill(String(q.ans + 1))
      await page.locator('.check-btn').click()
      await screenshot(page, `add-lv1/${label.replace(/[^a-z0-9]/gi, '_')}/wrong`)
      await expect(page.locator('.feedback.wrong')).toBeVisible()
    })
  }
})

// ── MUL m2 — 2× kertotaulu ───────────────────────────────────────────────────

test.describe('MUL m2 — 2× kertotaulu', () => {
  test.beforeEach(async ({ page }) => {
    await injectSeed(page, 3002)
    await openLevel(page, 'cat-mul', /^2×|2× taulu/i)
  })

  for (let qi = 0; qi < MUL_M2.length; qi++) {
    const q = MUL_M2[qi]
    const label = `q${qi + 1}: ${q.a}×${q.b}=${q.ans}`

    test(`[correct] ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.std-input, input[type="text"]').first()
        await input.fill(String(MUL_M2[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.std-input, input[type="text"]').first()
      await input.fill(String(q.ans))
      await page.locator('.check-btn').click()
      await screenshot(page, `mul-m2/${label.replace(/[^a-z0-9]/gi, '_')}/correct`)
      await expect(page.locator('.feedback.correct')).toBeVisible()
    })

    test(`[wrong]   ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('.std-input, input[type="text"]').first()
        await input.fill(String(MUL_M2[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('.std-input, input[type="text"]').first()
      await input.fill(String(q.ans + 1))
      await page.locator('.check-btn').click()
      await screenshot(page, `mul-m2/${label.replace(/[^a-z0-9]/gi, '_')}/wrong`)
      await expect(page.locator('.feedback.wrong')).toBeVisible()
    })
  }
})

// ── MEASURE cm↔mm ────────────────────────────────────────────────────────────

test.describe('MEASURE cm↔mm', () => {
  test.beforeEach(async ({ page }) => {
    await injectSeed(page, 5001)
    await openLevel(page, 'cat-measure', /cm.*mm|mm.*cm/i)
  })

  for (let qi = 0; qi < MEASURE_CM_MM.length; qi++) {
    const q = MEASURE_CM_MM[qi]
    const label = `q${qi + 1}: ${q.input}${q.inputUnit}=${q.ans}${q.ansUnit}`

    test(`[correct] ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('input').first()
        await input.fill(String(MEASURE_CM_MM[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('input').first()
      await input.fill(String(q.ans))
      await page.locator('.check-btn').click()
      await screenshot(page, `measure-cm-mm/${label.replace(/[^a-z0-9]/gi, '_')}/correct`)
      await expect(page.locator('.feedback.correct')).toBeVisible()
    })

    test(`[wrong]   ${label}`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const input = page.locator('input').first()
        await input.fill(String(MEASURE_CM_MM[i].ans))
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const input = page.locator('input').first()
      await input.fill(String(q.ans + 1))
      await page.locator('.check-btn').click()
      await screenshot(page, `measure-cm-mm/${label.replace(/[^a-z0-9]/gi, '_')}/wrong`)
      await expect(page.locator('.feedback.wrong')).toBeVisible()
    })
  }
})

// ── SEQ seqE — Kasvava ykköset ───────────────────────────────────────────────

test.describe('SEQ seqE — Kasvava ykköset', () => {
  test.beforeEach(async ({ page }) => {
    await injectSeed(page, 4005)
    await openLevel(page, 'cat-seq', /kasvava.*ykk|ascending.*ones/i)
  })

  for (let qi = 0; qi < SEQ_E.length; qi++) {
    const q = SEQ_E[qi]
    const label = `q${qi + 1}: start=${q.start} step=${q.step}`

    test(`[correct] ${label}`, async ({ page }) => {
      // Answer all previous sequence questions
      for (let i = 0; i < qi; i++) {
        const prev = SEQ_E[i]
        const inputs = page.locator('.seq-input, input[type="text"]')
        for (let k = 0; k < prev.answers.length; k++) {
          await inputs.nth(k).fill(String(prev.answers[k]))
        }
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      // Answer current question
      const inputs = page.locator('.seq-input, input[type="text"]')
      for (let k = 0; k < q.answers.length; k++) {
        await inputs.nth(k).fill(String(q.answers[k]))
      }
      await page.locator('.check-btn').click()
      await screenshot(page, `seq-e/${label.replace(/[^a-z0-9]/gi, '_')}/correct`)
      await expect(page.locator('.feedback.correct')).toBeVisible()
    })

    test(`[wrong]   ${label} (first answer off by 1)`, async ({ page }) => {
      for (let i = 0; i < qi; i++) {
        const prev = SEQ_E[i]
        const inputs = page.locator('.seq-input, input[type="text"]')
        for (let k = 0; k < prev.answers.length; k++) {
          await inputs.nth(k).fill(String(prev.answers[k]))
        }
        await page.locator('.check-btn').click()
        await page.locator('.next-btn').click()
      }
      const inputs = page.locator('.seq-input, input[type="text"]')
      await inputs.nth(0).fill(String(q.answers[0] + 1))  // deliberately wrong
      for (let k = 1; k < q.answers.length; k++) {
        await inputs.nth(k).fill(String(q.answers[k]))
      }
      await page.locator('.check-btn').click()
      await screenshot(page, `seq-e/${label.replace(/[^a-z0-9]/gi, '_')}/wrong`)
      await expect(page.locator('.feedback.wrong')).toBeVisible()
    })
  }
})
