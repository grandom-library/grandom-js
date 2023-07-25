import {
  LENGTH,
  BigIntStats,
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBigInt from '../../src/RandomBigInt'

const random = new RandomBigInt(new BasicEngine())

describe('RandomBigInt', () => {
  describe('options', () => {
    describe('exclude', () => {
      test('exclude a single digit', () => {
        const { add, result } = new BigIntStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.bigint(0n, 9n, { exclude: [5n] }))
        }

        expect(result.numEntries).toBe(8)
        expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n', '6n', '7n', '8n'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
        expect(result.highestValue).toBeLessThanOrEqual(0.14)
        expect(result.averageValue).toBeWithin(0.11, 0.14)

        expect(result.of(0n)).toBeWithin(0.11, 0.14)
        expect(result.of(8n)).toBeWithin(0.11, 0.14)
      })

      test('exclude a range - from the beginning', () => {
        const { add, result } = new BigIntStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.bigint(0n, 9n, { exclude: ['0n-5n'] }))
        }

        expect(result.numEntries).toBe(3)
        expect(result.bigints).toEqual(['6n', '7n', '8n'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.35)
        expect(result.averageValue).toBeWithin(0.32, 0.35)

        expect(result.of(6n)).toBeWithin(0.32, 0.35)
        expect(result.of(8n)).toBeWithin(0.32, 0.35)
      })

      test('exclude a range - from the middle', () => {
        const { add, result } = new BigIntStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.bigint(0n, 9n, { exclude: ['3n-6n'] }))
        }

        expect(result.numEntries).toBe(5)
        expect(result.bigints).toEqual(['0n', '1n', '2n', '7n', '8n'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.18)
        expect(result.highestValue).toBeLessThanOrEqual(0.22)
        expect(result.averageValue).toBeWithin(0.18, 0.22)

        expect(result.of(0n)).toBeWithin(0.18, 0.22)
        expect(result.of(8n)).toBeWithin(0.18, 0.22)
      })

      test('exclude a range - from the end', () => {
        const { add, result } = new BigIntStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.bigint(0n, 9n, { exclude: ['5n-9n'] }))
        }

        expect(result.numEntries).toBe(5)
        expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.19)
        expect(result.highestValue).toBeLessThanOrEqual(0.22)
        expect(result.averageValue).toBeWithin(0.19, 0.22)

        expect(result.of(0n)).toBeWithin(0.19, 0.22)
        expect(result.of(4n)).toBeWithin(0.19, 0.22)
      })

      test('exclude the entire range - with infinite loop guard', () => {
        let error: any

        try {
          random.bigint(0n, 9n, { exclude: ['0n-9n'] })
        } catch (e) {
          error = e
        }

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Infinite loop guard reached after 1000000 iterations.')
      })
    })
  })
})
