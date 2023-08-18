import { StringStats } from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomString from '../../src/RandomString'

const random = new RandomString(new BasicEngine())

describe('RandomString', () => {
  describe('call with length -> .random(length)', () => {
    describe('without options', () => {
      test('length === 0 -> .random(0)', () => {
        const { add, result } = new StringStats()

        for (let i = 0; i < 100_000; i++) {
          add(random.string(0))
        }

        expect(result.characters).toBe('')

        expect(result.lowestLength).toBe(0)
        expect(result.highestLength).toBe(0)
        expect(result.averageLength).toBe(0)
      })

      test('length === 8.5 (float) -> .random(8.5)', () => {
        const { add, result } = new StringStats()

        for (let i = 0; i < 100_000; i++) {
          add(random.string(8.5))
        }

        expect(result.characters).toBe(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        )

        expect(result.lowestLength).toBe(8)
        expect(result.highestLength).toBe(8)
        expect(result.averageLength).toBe(8)
      })

      test('length === 8 -> .random(8)', () => {
        const { add, result } = new StringStats()

        for (let i = 0; i < 100_000; i++) {
          add(random.string(8))
        }

        expect(result.characters).toBe(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        )

        expect(result.lowestLength).toBe(8)
        expect(result.highestLength).toBe(8)
        expect(result.averageLength).toBe(8)
      })

      test('length === 24 -> .random(24)', () => {
        const { add, result } = new StringStats()

        for (let i = 0; i < 100_000; i++) {
          add(random.string(24))
        }

        expect(result.characters).toBe(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        )

        expect(result.lowestLength).toBe(24)
        expect(result.highestLength).toBe(24)
        expect(result.averageLength).toBe(24)
      })

      describe('errors', () => {
        test('invalid types', () => {
          // @ts-expect-error
          expect(() => random.string(null)).toThrowWithMessage(
            TypeError,
            'length must be a number, got: null (typeof === "object").'
          )

          // @ts-expect-error
          expect(() => random.string(false)).toThrowWithMessage(
            TypeError,
            'length must be a number, got: false (typeof === "boolean").'
          )
        })

        test('invalid ranges', () => {
          expect(() => random.string(NaN)).toThrowWithMessage(
            RangeError,
            'length must be a non-NaN number, got: NaN.'
          )

          expect(() => random.string(-Infinity)).toThrowWithMessage(
            RangeError,
            'length must be >= 0 <= 2^53-1 (9,007,199,254,740,991), got -Infinity.'
          )

          expect(() => random.string(Infinity)).toThrowWithMessage(
            RangeError,
            'length must be >= 0 <= 2^53-1 (9,007,199,254,740,991), got Infinity.'
          )

          expect(() => random.string(-1)).toThrowWithMessage(
            RangeError,
            'length must be >= 0 <= 2^53-1 (9,007,199,254,740,991), got -1.'
          )
        })
      })
    })

    describe('with options', () => {
      test('length === 32 -> .random(32)', () => {
        const { add, result } = new StringStats()

        for (let i = 0; i < 100_000; i++) {
          add(random.string(32, { }))
        }

        expect(result.characters).toBe(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        )

        expect(result.lowestLength).toBe(32)
        expect(result.highestLength).toBe(32)
        expect(result.averageLength).toBe(32)
      })
    })
  })
})
