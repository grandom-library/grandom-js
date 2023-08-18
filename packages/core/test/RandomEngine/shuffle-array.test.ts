import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { TestEngine } from '../fixtures'

function getIndexedNumbers (numbers: number[]): number[] {
  const nums: number[] = []

  for (let i = 0; i < numbers.length; i++) {
    nums.push((i + 1) * 10 + numbers[i])
  }

  return nums
}

describe('RandomEngine', () => {
  test('.shuffleArray()', () => {
    const { add, result } = new IntegerStats()
    const engine = new TestEngine()

    for (let i = 0; i < LENGTH; i++) {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

      engine.shuffleArray(numbers)

      for (const number of getIndexedNumbers(numbers)) {
        add(number)
      }
    }

    expect(result.numEntries).toBe(100)
    expect(result.integers).toEqual([
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
      90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
      100, 101, 102, 103, 104, 105, 106, 107, 108, 109
    ])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.008)
    expect(result.highestValue).toBeLessThanOrEqual(0.011)
    expect(result.averageValue).toBeWithin(0.008, 0.012)

    expect(result.of(10)).toBeWithin(0.008, 0.012)
    expect(result.of(50)).toBeWithin(0.008, 0.012)
    expect(result.of(109)).toBeWithin(0.008, 0.012)
  })
})
