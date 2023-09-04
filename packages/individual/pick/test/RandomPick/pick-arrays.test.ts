import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { SeedableEngine } from '@grandom/engines'
import RandomPick from '../../src/RandomPick'

const random = new RandomPick(new SeedableEngine())

describe('RandomPick', () => {
  describe('.pick()', () => {
    describe('arrays', () => {
      test('called with an array - no count, no options', () => {
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

      describe('count', () => {
        test('call with count === 3', () => {
          const { add, result } = new IntegerStats()

          for (let i = 0; i < LENGTH; i++) {
            add(parseInt(random.pick([1, 2, 3, 4, 5], 3).join('')))
          }

          expect(result.numEntries).toBe(125)
          expect(result.integers).toEqual([
            111, 112, 113, 114, 115, 121, 122, 123, 124, 125,
            131, 132, 133, 134, 135, 141, 142, 143, 144, 145,
            151, 152, 153, 154, 155,

            211, 212, 213, 214, 215, 221, 222, 223, 224, 225,
            231, 232, 233, 234, 235, 241, 242, 243, 244, 245,
            251, 252, 253, 254, 255,

            311, 312, 313, 314, 315, 321, 322, 323, 324, 325,
            331, 332, 333, 334, 335, 341, 342, 343, 344, 345,
            351, 352, 353, 354, 355,

            411, 412, 413, 414, 415, 421, 422, 423, 424, 425,
            431, 432, 433, 434, 435, 441, 442, 443, 444, 445,
            451, 452, 453, 454, 455,

            511, 512, 513, 514, 515, 521, 522, 523, 524, 525,
            531, 532, 533, 534, 535, 541, 542, 543, 544, 545,
            551, 552, 553, 554, 555
          ])

          expect(result.lowestValue).toBeGreaterThanOrEqual(0.007)
          expect(result.highestValue).toBeLessThanOrEqual(0.009)
          expect(result.averageValue).toBeWithin(0.007, 0.009)

          expect(result.of(111)).toBeWithin(0.007, 0.009)
          expect(result.of(222)).toBeWithin(0.007, 0.009)
          expect(result.of(333)).toBeWithin(0.007, 0.009)
          expect(result.of(444)).toBeWithin(0.007, 0.009)
          expect(result.of(555)).toBeWithin(0.007, 0.009)
        })

        describe('errors', () => {
          test('count is a wrong type (null)', () => {
            // @ts-expect-error
            expect(() => random.pick([1, 2, 3], null)).toThrowWithMessage(
              TypeError,
              '2nd argument must be a number (count), or an object (options), ' +
              'got: null (typeof === \'object\').'
            )
          })

          test('count is a wrong type (false)', () => {
            // @ts-expect-error
            expect(() => random.pick([1, 2, 3], false)).toThrowWithMessage(
              TypeError,
              '2nd argument must be a number (count), or an object (options), ' +
              'got: false (typeof === \'boolean\').'
            )
          })

          describe('count is a useless / out of range number', () => {
            test('count === 0', () => {
              expect(() => random.pick([1, 2, 3], 0)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 0.'
              )
            })

            test('count === NaN', () => {
              expect(() => random.pick([1, 2, 3], NaN)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: NaN.'
              )
            })

            test('count === Number.MAX_SAFE_INTEGER + 1', () => {
              expect(() => random.pick([1, 2, 3], Number.MAX_SAFE_INTEGER + 1))
                .toThrowWithMessage(
                  RangeError,
                  'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 9007199254740992.'
                )
            })

            test('count === -Infinity', () => {
              expect(() => random.pick([1, 2, 3], -Infinity)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: -Infinity.'
              )
            })

            test('count === Infinity', () => {
              expect(() => random.pick([1, 2, 3], Infinity)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: Infinity.'
              )
            })
          })
        })
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

        describe('errors', () => {
          test('options is a wrong type (null)', () => {
            // @ts-expect-error
            expect(() => random.pick([1, 2, 3], 1, null)).toThrowWithMessage(
              TypeError,
              '3rd argument must be an object (options), got: null (typeof === \'object\').'
            )
          })

          test('options is a wrong type (false)', () => {
            // @ts-expect-error
            expect(() => random.pick([1, 2, 3], 1, false)).toThrowWithMessage(
              TypeError,
              '3rd argument must be an object (options), got: false (typeof === \'boolean\').'
            )
          })
        })
      })
    })
  })
})
