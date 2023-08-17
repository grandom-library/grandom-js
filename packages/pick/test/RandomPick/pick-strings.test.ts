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
    describe('strings', () => {
      test('called with a string (without options)', () => {
        const { add, result } = new CharacterStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.pick('abc'))
        }

        expect(result.numCharacters).toBe(3)
        expect(result.characters).toEqual(['a', 'b', 'c'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.35)
        expect(result.averageValue).toBeWithin(0.32, 0.35)

        expect(result.of('a')).toBeWithin(0.32, 0.35)
        expect(result.of('b')).toBeWithin(0.32, 0.35)
        expect(result.of('c')).toBeWithin(0.32, 0.35)
      })

      describe('options', () => {
        describe('count', () => {
          test('call with count === 3', () => {
            const { add, result } = new IntegerStats()

            for (let i = 0; i < LENGTH; i++) {
              add(parseInt(random.pick('123', { count: 3 })))
            }

            expect(result.numEntries).toBe(27)
            expect(result.integers).toEqual([
              111, 112, 113, 121, 122, 123, 131, 132, 133,
              211, 212, 213, 221, 222, 223, 231, 232, 233,
              311, 312, 313, 321, 322, 323, 331, 332, 333
            ])

            expect(result.lowestValue).toBeGreaterThanOrEqual(0.036)
            expect(result.highestValue).toBeLessThanOrEqual(0.038)
            expect(result.averageValue).toBeWithin(0.036, 0.038)

            expect(result.of(111)).toBeWithin(0.036, 0.038)
            expect(result.of(222)).toBeWithin(0.036, 0.038)
            expect(result.of(333)).toBeWithin(0.036, 0.038)
          })

          describe('errors', () => {
            test('count is a wrong type (null)', () => {
              // @ts-expect-error
              expect(() => random.pick('abc', { count: null })).toThrowWithMessage(
                TypeError,
                'Count must be a number, got: null (typeof === \'object\').'
              )
            })

            test('count is a useless / out of range number', () => {
              expect(() => random.pick('abc', { count: 0 })).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 0.'
              )

              expect(() => random.pick('abc', { count: Number.MAX_SAFE_INTEGER + 1 }))
                .toThrowWithMessage(
                  RangeError,
                  'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 9007199254740992.'
                )

              expect(() => random.pick('abc', { count: NaN })).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: NaN.'
              )

              expect(() => random.pick('abc', { count: -Infinity })).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: -Infinity.'
              )

              expect(() => random.pick('abc', { count: Infinity })).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: Infinity.'
              )
            })
          })
        })

        describe('fallback', () => {
          test('fallback with the default value (undefined)', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick('')).toBeUndefined()
            }
          })

          test('fallback with a custom value', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick('', { default: false })).toBe(false)
            }
          })
        })
      })
    })
  })
})
