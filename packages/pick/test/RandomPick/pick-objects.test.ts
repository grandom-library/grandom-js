import {
  LENGTH,
  CharacterStats,
  IntegerStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomPick from '../../src/RandomPick'

const random = new RandomPick(new BasicEngine())

describe('RandomPick', () => {
  describe('.pick()', () => {
    describe('objects', () => {
      test('called with an object (without options)', () => {
        const characters = new CharacterStats()
        const integers = new IntegerStats()

        for (let i = 0; i < 10_000; i++) {
          const [key, value] = random.pick({ a: 1, b: 2, c: 3 })

          expect(`${key}-${value}`).toBeOneOf(['a-1', 'b-2', 'c-3'])
        }

        for (let i = 0; i < LENGTH; i++) {
          const [key, value] = random.pick({ a: 1, b: 2, c: 3 })

          characters.add(key)
          integers.add(value)
        }

        expect(characters.result.numCharacters).toBe(3)
        expect(characters.result.characters).toEqual(['a', 'b', 'c'])

        expect(characters.result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(characters.result.highestValue).toBeLessThanOrEqual(0.35)
        expect(characters.result.averageValue).toBeWithin(0.32, 0.35)

        expect(characters.result.of('a')).toBeWithin(0.32, 0.35)
        expect(characters.result.of('b')).toBeWithin(0.32, 0.35)
        expect(characters.result.of('c')).toBeWithin(0.32, 0.35)

        expect(integers.result.numEntries).toBe(3)
        expect(integers.result.integers).toEqual([1, 2, 3])

        expect(integers.result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(integers.result.highestValue).toBeLessThanOrEqual(0.35)
        expect(integers.result.averageValue).toBeWithin(0.32, 0.35)

        expect(integers.result.of(1)).toBeWithin(0.32, 0.35)
        expect(integers.result.of(2)).toBeWithin(0.32, 0.35)
        expect(integers.result.of(3)).toBeWithin(0.32, 0.35)
      })

      describe('options', () => {
        describe('fallback', () => {
          test('fallback with the default value (undefined)', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick({})).toBeUndefined()
            }
          })

          test('fallback with a custom value', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick({}, { default: false })).toBe(false)
            }
          })
        })
      })
    })
  })
})
