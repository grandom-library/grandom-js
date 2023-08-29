import {
  LENGTH,
  IntegerStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomInteger from '../../../src/integer/RandomInteger'

const random = new RandomInteger(new BasicEngine())

describe('RandomInteger', () => {
  describe('options', () => {
    test('includeMinimum === true', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.integer(0, 9, { includeMinimum: true }))
      }

      expect(result.numEntries).toBe(9)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.12)

      expect(result.of(0)).toBeWithin(0.10, 0.12)
      expect(result.of(8)).toBeWithin(0.10, 0.12)
    })

    test('includeMinimum === false', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.integer(0, 9, { includeMinimum: false }))
      }

      expect(result.numEntries).toBe(8)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
      expect(result.highestValue).toBeLessThanOrEqual(0.13)
      expect(result.averageValue).toBeWithin(0.11, 0.13)

      expect(result.of(1)).toBeWithin(0.11, 0.13)
      expect(result.of(8)).toBeWithin(0.11, 0.13)
    })

    test('includeMaximum === true', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.integer(0, 9, { includeMaximum: true }))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(0)).toBeWithin(0.09, 0.12)
      expect(result.of(9)).toBeWithin(0.09, 0.12)
    })

    test('includeMaximum === false', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.integer(0, 9, { includeMaximum: false }))
      }

      expect(result.numEntries).toBe(9)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.13)

      expect(result.of(0)).toBeWithin(0.10, 0.13)
      expect(result.of(8)).toBeWithin(0.10, 0.13)
    })

    test('includeMinimum === false && includeMaximum === false', () => {
      const { add, result } = new IntegerStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.integer(0, 9, { includeMinimum: false, includeMaximum: false }))
      }

      expect(result.numEntries).toBe(8)
      expect(result.integers).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
      expect(result.highestValue).toBeLessThanOrEqual(0.13)
      expect(result.averageValue).toBeWithin(0.11, 0.14)

      expect(result.of(1)).toBeWithin(0.11, 0.14)
      expect(result.of(8)).toBeWithin(0.11, 0.14)
    })
  })
})
