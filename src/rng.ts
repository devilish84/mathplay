type RngFn = () => number

declare global {
  interface Window { __rng?: RngFn }
}

export function getRng(): RngFn {
  if (typeof window !== 'undefined' && window.__rng) return window.__rng
  return Math.random
}

/** Integer in [min, max] inclusive */
export function rand(min: number, max: number): number {
  return Math.floor(getRng()() * (max - min + 1)) + min
}

/** Pick a random element from an array */
export function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)]
}

/** Shuffle array in-place using Fisher-Yates */
export function shuffle<T>(arr: T[]): T[] {
  const rng = getRng()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
