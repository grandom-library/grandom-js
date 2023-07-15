import { IntegerStats } from '@testyard/stats'

import { LENGTH } from '..'
import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}

describe('RandomEngine', () => {
  describe('.nextInteger()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)

      expect(result.averageValue).toBeGreaterThanOrEqual(.09)
      expect(result.averageValue).toBeLessThanOrEqual(.11)

      expect(result.of(0)).toBeGreaterThanOrEqual(.09)
      expect(result.of(0)).toBeLessThanOrEqual(.11)
      expect(result.of(9)).toBeGreaterThanOrEqual(.09)
      expect(result.of(9)).toBeLessThanOrEqual(.11)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.090)
      expect(result.highestValue).toBeLessThanOrEqual(.092)

      expect(result.averageValue).toBeGreaterThanOrEqual(.090)
      expect(result.averageValue).toBeLessThanOrEqual(.092)

      expect(result.of(0)).toBeGreaterThanOrEqual(.090)
      expect(result.of(0)).toBeLessThanOrEqual(.092)
      expect(result.of(10)).toBeGreaterThanOrEqual(.090)
      expect(result.of(10)).toBeLessThanOrEqual(.092)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)

      expect(result.averageValue).toBeGreaterThanOrEqual(.09)
      expect(result.averageValue).toBeLessThanOrEqual(.11)

      expect(result.of(1)).toBeGreaterThanOrEqual(.09)
      expect(result.of(1)).toBeLessThanOrEqual(.11)
      expect(result.of(10)).toBeGreaterThanOrEqual(.09)
      expect(result.of(10)).toBeLessThanOrEqual(.11)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.10)
      expect(result.highestValue).toBeLessThanOrEqual(.12)

      expect(result.averageValue).toBeGreaterThanOrEqual(.10)
      expect(result.averageValue).toBeLessThanOrEqual(.12)

      expect(result.of(1)).toBeGreaterThanOrEqual(.10)
      expect(result.of(1)).toBeLessThanOrEqual(.12)
      expect(result.of(9)).toBeGreaterThanOrEqual(.10)
      expect(result.of(9)).toBeLessThanOrEqual(.12)
    })
  })
})
