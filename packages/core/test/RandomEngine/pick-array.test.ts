import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  describe('.pickArray()', () => {
    test('call with a shorter array', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.pickArray([1, 2, 3]))
      }

      expect(result.numEntries).toBe(3)
      expect(result.integers).toEqual([1, 2, 3])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
      expect(result.highestValue).toBeLessThanOrEqual(0.34)
      expect(result.averageValue).toBeWithin(0.32, 0.35)

      expect(result.of(1)).toBeWithin(0.32, 0.35)
      expect(result.of(2)).toBeWithin(0.32, 0.35)
      expect(result.of(3)).toBeWithin(0.32, 0.35)
    })

    test('call with a longer array', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.pickArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.08)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.08, 0.12)

      expect(result.of(0)).toBeWithin(0.08, 0.12)
      expect(result.of(5)).toBeWithin(0.08, 0.12)
      expect(result.of(9)).toBeWithin(0.08, 0.12)
    })
  })
})
