import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { RandomEngine } from '../../src'
import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  describe('.nextInteger()', () => {
    test('default usage', () => {
      const engine = new TestEngine()

      for (let i = 0; i < 5_000; i++) {
        const result = engine.nextInteger()

        expect(result).toBeInteger()
        expect(result).toBeWithin(
          RandomEngine.DEFAULT_INTEGER_MINIMUM,
          RandomEngine.DEFAULT_INTEGER_MAXIMUM
        )
      }
    })

    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(0)).toBeWithin(0.09, 0.12)
      expect(result.of(9)).toBeWithin(0.09, 0.12)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.090)
      expect(result.highestValue).toBeLessThanOrEqual(0.092)
      expect(result.averageValue).toBeWithin(0.090, 0.093)

      expect(result.of(0)).toBeWithin(0.090, 0.093)
      expect(result.of(10)).toBeWithin(0.090, 0.093)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(1)).toBeWithin(0.09, 0.12)
      expect(result.of(10)).toBeWithin(0.09, 0.12)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextInteger(0, 10, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.13)

      expect(result.of(1)).toBeWithin(0.10, 0.13)
      expect(result.of(9)).toBeWithin(0.10, 0.13)
    })
  })
})
