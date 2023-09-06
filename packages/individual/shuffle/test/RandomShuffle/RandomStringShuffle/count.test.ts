import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { SeedableEngine } from '@grandom/engines'
import RandomStringShuffle from '../../../src/RandomShuffle/RandomStringShuffle'

const random = new RandomStringShuffle(new SeedableEngine())

describe('RandomStringShuffle', () => {
  describe('.shuffle()', () => {
    describe('count', () => {
      test('call with count === 0', () => {
        expect(() => random.shuffle('123', 0)).toThrowWithMessage(
          RangeError,
          'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: 0.'
        )
      })

      test('call with count === 1 (less, than input string length)', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(parseInt(random.shuffle('123', 1)))
        }

        expect(result.numEntries).toBe(3)
        expect(result.integers).toEqual([1, 2, 3])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.34)
        expect(result.averageValue).toBeWithin(0.32, 0.34)

        expect(result.of(1)).toBeWithin(0.32, 0.34)
        expect(result.of(2)).toBeWithin(0.32, 0.34)
        expect(result.of(3)).toBeWithin(0.32, 0.34)
      })

      test('call with count === 2 (less, than input string length)', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(parseInt(random.shuffle('123', 2)))
        }

        expect(result.numEntries).toBe(6)
        expect(result.integers).toEqual([12, 13, 21, 23, 31, 32])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.15)
        expect(result.highestValue).toBeLessThanOrEqual(0.17)
        expect(result.averageValue).toBeWithin(0.15, 0.17)

        expect(result.of(12)).toBeWithin(0.15, 0.17)
        expect(result.of(23)).toBeWithin(0.15, 0.17)
        expect(result.of(32)).toBeWithin(0.15, 0.17)
      })

      test('call with count === 3 (equal to input string length)', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(parseInt(random.shuffle('123', 3)))
        }

        expect(result.numEntries).toBe(6)
        expect(result.integers).toEqual([123, 132, 213, 231, 312, 321])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.15)
        expect(result.highestValue).toBeLessThanOrEqual(0.17)
        expect(result.averageValue).toBeWithin(0.15, 0.17)

        expect(result.of(123)).toBeWithin(0.15, 0.17)
        expect(result.of(231)).toBeWithin(0.15, 0.17)
        expect(result.of(321)).toBeWithin(0.15, 0.17)
      })

      test('call with count === 4 (larger, than input string length)', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(parseInt(random.shuffle('123', 4)))
        }

        expect(result.numEntries).toBe(6)
        expect(result.integers).toEqual([123, 132, 213, 231, 312, 321])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.15)
        expect(result.highestValue).toBeLessThanOrEqual(0.17)
        expect(result.averageValue).toBeWithin(0.15, 0.17)

        expect(result.of(123)).toBeWithin(0.15, 0.17)
        expect(result.of(231)).toBeWithin(0.15, 0.17)
        expect(result.of(321)).toBeWithin(0.15, 0.17)
      })

      describe('errors', () => {
        test('count is a wrong type (null)', () => {
          // @ts-expect-error
          expect(() => random.shuffle('abc', null)).toThrowWithMessage(
            TypeError,
            '2nd argument must be a number (count), or an object (options), ' +
            'got: null (typeof === \'object\').'
          )
        })

        test('count is a wrong type (false)', () => {
          // @ts-expect-error
          expect(() => random.shuffle('abc', false)).toThrowWithMessage(
            TypeError,
            '2nd argument must be a number (count), or an object (options), ' +
            'got: false (typeof === \'boolean\').'
          )
        })

        describe('count is a useless / out of range number', () => {
          test('count === 0', () => {
            expect(() => random.shuffle('abc', 0)).toThrowWithMessage(
              RangeError,
              'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: 0.'
            )
          })

          test('count === NaN', () => {
            expect(() => random.shuffle('abc', NaN)).toThrowWithMessage(
              RangeError,
              'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: NaN.'
            )
          })

          test('count === Number.MAX_SAFE_INTEGER + 1', () => {
            expect(() => random.shuffle('abc', Number.MAX_SAFE_INTEGER + 1))
              .toThrowWithMessage(
                RangeError,
                'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: 9007199254740992.'
              )
          })

          test('count === -Infinity', () => {
            expect(() => random.shuffle('abc', -Infinity)).toThrowWithMessage(
              RangeError,
              'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: -Infinity.'
            )
          })

          test('count === Infinity', () => {
            expect(() => random.shuffle('abc', Infinity)).toThrowWithMessage(
              RangeError,
              'Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: Infinity.'
            )
          })
        })
      })
    })
  })
})
