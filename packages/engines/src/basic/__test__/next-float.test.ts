import {
  LENGTH,
  FloatStats
} from '@testyard/stats'

import BasicEngine from '..'

const engine = new BasicEngine()

describe('BasicEngine', () => {
  describe('.nextFloat()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new FloatStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextFloat(), 2)
      }

      expect(result.numEntries).toBe(100)

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.009)
      expect(result.highestValue).toBeLessThanOrEqual(0.011)
      expect(result.averageValue).toBeWithin(0.009, 0.012)

      expect(result.firstEntry.value).toBe(0)
      expect(result.firstEntry.percent).toBeWithin(0.009, 0.012)

      expect(result.lastEntry.value).toBe(0.99)
      expect(result.lastEntry.percent).toBeWithin(0.009, 0.012)
    })
  })
})
