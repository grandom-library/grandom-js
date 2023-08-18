import {
  LENGTH,
  BigIntStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBigInt from '../../src/RandomBigInt'

const random = new RandomBigInt(new BasicEngine())

describe('RandomBigInt', () => {
  describe('options', () => {
    test('includeMinimum === true', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.bigint(0n, 9n, { includeMinimum: true }))
      }

      expect(result.numEntries).toBe(9)
      expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n'])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.12)

      expect(result.of(0n)).toBeWithin(0.10, 0.12)
      expect(result.of(8n)).toBeWithin(0.10, 0.12)
    })

    test('includeMinimum === false', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.bigint(0n, 9n, { includeMinimum: false }))
      }

      expect(result.numEntries).toBe(8)
      expect(result.bigints).toEqual(['1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n'])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
      expect(result.highestValue).toBeLessThanOrEqual(0.13)
      expect(result.averageValue).toBeWithin(0.11, 0.13)

      expect(result.of(1n)).toBeWithin(0.11, 0.13)
      expect(result.of(8n)).toBeWithin(0.11, 0.13)
    })

    test('includeMaximum === true', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.bigint(0n, 9n, { includeMaximum: true }))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(0n)).toBeWithin(0.09, 0.12)
      expect(result.of(9n)).toBeWithin(0.09, 0.12)
    })

    test('includeMaximum === false', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.bigint(0n, 9n, { includeMaximum: false }))
      }

      expect(result.numEntries).toBe(9)
      expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n'])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.13)

      expect(result.of(0n)).toBeWithin(0.10, 0.13)
      expect(result.of(8n)).toBeWithin(0.10, 0.13)
    })

    test('includeMinimum === false && includeMaximum === false', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.bigint(0n, 9n, { includeMinimum: false, includeMaximum: false }))
      }

      expect(result.numEntries).toBe(8)
      expect(result.bigints).toEqual(['1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n'])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.11)
      expect(result.highestValue).toBeLessThanOrEqual(0.13)
      expect(result.averageValue).toBeWithin(0.11, 0.14)

      expect(result.of(1n)).toBeWithin(0.11, 0.14)
      expect(result.of(8n)).toBeWithin(0.11, 0.14)
    })
  })
})
