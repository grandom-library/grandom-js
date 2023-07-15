import { FloatStats } from '@testyard/stats'

import { LENGTH } from '..'
import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}

describe('RandomEngine', () => {
  describe('.nextFloat()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new FloatStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextFloat(), 2)
      }

      expect(result.numEntries).toBe(100)

      expect(result.lowestValue).toBeGreaterThanOrEqual(.009)
      expect(result.highestValue).toBeLessThanOrEqual(.011)

      expect(result.averageValue).toBeGreaterThanOrEqual(.009)
      expect(result.averageValue).toBeLessThanOrEqual(.011)

      expect(result.firstEntry.value).toBe(0)
      expect(result.firstEntry.percent).toBeGreaterThanOrEqual(.009)
      expect(result.firstEntry.percent).toBeLessThanOrEqual(.011)

      expect(result.lastEntry.value).toBe(.99)
      expect(result.lastEntry.percent).toBeGreaterThanOrEqual(.009)
      expect(result.lastEntry.percent).toBeLessThanOrEqual(.011)
    })
  })
})
