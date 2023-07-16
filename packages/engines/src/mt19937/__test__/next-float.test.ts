import {
  LENGTH,
  FloatStats
} from '@testyard/stats'

import MT19937Engine from '..'

const engine = new MT19937Engine()

describe('MT19937Engine', () => {
  describe('.nextFloat()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new FloatStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextFloat(), 2)
      }

      expect(result.numEntries).toBe(100)

      expect(result.lowestValue).toBeGreaterThanOrEqual(.009)
      expect(result.highestValue).toBeLessThanOrEqual(.011)
      expect(result.averageValue).toBeWithin(.009, .012)

      expect(result.firstEntry.value).toBe(0)
      expect(result.firstEntry.percent).toBeWithin(.009, .012)

      expect(result.lastEntry.value).toBe(.99)
      expect(result.lastEntry.percent).toBeWithin(.009, .012)
    })
  })
})