import {
  LENGTH,
  FloatStats
} from '@testyard/stats'

import { RandomEngine } from '../../src'
import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  describe('.nextFloat()', () => {
    test('default usage', () => {
      const engine = new TestEngine()

      for (let i = 0; i < 5_000; i++) {
        const result = engine.nextFloat()

        expect(result).toBeNumber()
        expect(result).toBeWithin(
          RandomEngine.DEFAULT_FLOAT_MINIMUM,
          RandomEngine.DEFAULT_FLOAT_MAXIMUM
        )
      }
    })

    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new FloatStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextFloat(0, 10, true, false), 1)
      }

      expect(result.numEntries).toBe(100)

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.009)
      expect(result.highestValue).toBeLessThanOrEqual(0.011)
      expect(result.averageValue).toBeWithin(0.009, 0.012)

      expect(result.firstEntry.value).toBe(0)
      expect(result.firstEntry.percent).toBeWithin(0.009, 0.012)

      expect(result.lastEntry.value).toBe(9.9)
      expect(result.lastEntry.percent).toBeWithin(0.009, 0.012)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new FloatStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(parseFloat(engine.nextFloat(0, 10, true, true).toPrecision(2)))
      }

      expect(result.numEntries).toBe(101)

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.004)
      expect(result.highestValue).toBeLessThanOrEqual(0.011)
      expect(result.averageValue).toBeWithin(0.009, 0.012)

      expect(result.firstEntry.value).toBe(0)
      expect(result.firstEntry.percent).toBeWithin(0.009, 0.012)

      expect(result.lastEntry.value).toBe(10)
      expect(result.lastEntry.percent).toBeWithin(0.004, 0.012)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const engine = new TestEngine()

      for (let i = 0; i < 10_000; i++) {
        expect(engine.nextFloat(0, 1, false, true)).not.toBeCloseTo(0, 15)
      }
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const engine = new TestEngine()

      for (let i = 0; i < 10_000; i++) {
        const result = engine.nextFloat(0, 1, false, false)

        expect(result).not.toBeCloseTo(0, 15)
        expect(result).not.toBeCloseTo(1, 15)
      }
    })
  })
})
