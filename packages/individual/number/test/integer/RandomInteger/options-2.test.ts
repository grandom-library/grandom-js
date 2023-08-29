import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomInteger from '../../../src/integer/RandomInteger'

const random = new RandomInteger(new BasicEngine())

describe('RandomInteger', () => {
  describe('options', () => {
    describe('exclude', () => {
      test('exclude a single digit', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.integer(0, 9, { exclude: [5] }))
        }

        expect(result.numEntries).toBe(8)
        expect(result.integers).toEqual([0, 1, 2, 3, 4, 6, 7, 8])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
        expect(result.highestValue).toBeLessThanOrEqual(0.14)
        expect(result.averageValue).toBeWithin(0.11, 0.14)

        expect(result.of(0)).toBeWithin(0.11, 0.14)
        expect(result.of(8)).toBeWithin(0.11, 0.14)
      })

      test('exclude a range - from the beginning', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.integer(0, 9, { exclude: ['0-5'] }))
        }

        expect(result.numEntries).toBe(3)
        expect(result.integers).toEqual([6, 7, 8])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.35)
        expect(result.averageValue).toBeWithin(0.32, 0.35)

        expect(result.of(6)).toBeWithin(0.32, 0.35)
        expect(result.of(8)).toBeWithin(0.32, 0.35)
      })

      test('exclude a range - from the middle', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.integer(0, 9, { exclude: ['3-6'] }))
        }

        expect(result.numEntries).toBe(5)
        expect(result.integers).toEqual([0, 1, 2, 7, 8])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.18)
        expect(result.highestValue).toBeLessThanOrEqual(0.22)
        expect(result.averageValue).toBeWithin(0.18, 0.22)

        expect(result.of(0)).toBeWithin(0.18, 0.22)
        expect(result.of(8)).toBeWithin(0.18, 0.22)
      })

      test('exclude a range - from the end', () => {
        const { add, result } = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.integer(0, 9, { exclude: ['5-9'] }))
        }

        expect(result.numEntries).toBe(5)
        expect(result.integers).toEqual([0, 1, 2, 3, 4])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.19)
        expect(result.highestValue).toBeLessThanOrEqual(0.22)
        expect(result.averageValue).toBeWithin(0.19, 0.22)

        expect(result.of(0)).toBeWithin(0.19, 0.22)
        expect(result.of(4)).toBeWithin(0.19, 0.22)
      })

      test('exclude the entire range - with infinite loop guard', () => {
        let error: any

        try {
          random.integer(0, 9, { exclude: ['0-9'] })
        } catch (e) {
          error = e
        }

        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('Infinite loop guard reached after 1000000 iterations.')
      })
    })
  })
})
