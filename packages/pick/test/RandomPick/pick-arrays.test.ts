import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomPick from '../../src/RandomPick'

const random = new RandomPick(new BasicEngine())

describe('RandomPick', () => {
  describe('.pick()', () => {
    describe('arrays', () => {
      test('called with an array (without options)', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.pick([1, 2, 3]))
        }

        expect(result.numEntries).toBe(3)
        expect(result.integers).toEqual([1, 2, 3])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.35)
        expect(result.averageValue).toBeWithin(0.32, 0.35)

        expect(result.of(1)).toBeWithin(0.32, 0.35)
        expect(result.of(2)).toBeWithin(0.32, 0.35)
        expect(result.of(3)).toBeWithin(0.32, 0.35)
      })

      describe('options', () => {
        describe('fallback', () => {
          test('fallback with the default value (undefined)', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick([])).toBeUndefined()
            }
          })

          test('fallback with a custom value', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick([], { default: false })).toBe(false)
            }
          })
        })
      })
    })
  })
})
