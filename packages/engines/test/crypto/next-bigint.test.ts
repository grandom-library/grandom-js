import {
  LENGTH,
  BigIntStats
} from '@testyard/stats'

import CryptoEngine from '../../src/crypto'

const HALF_LENGTH = LENGTH / 2
const engine = new CryptoEngine()

describe('CryptoEngine', () => {
  describe('.nextBigInt()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < HALF_LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(0n)).toBeWithin(0.09, 0.12)
      expect(result.of(9n)).toBeWithin(0.09, 0.12)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < HALF_LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.089)
      expect(result.highestValue).toBeLessThanOrEqual(0.092)
      expect(result.averageValue).toBeWithin(0.089, 0.093)

      expect(result.of(0n)).toBeWithin(0.089, 0.093)
      expect(result.of(10n)).toBeWithin(0.089, 0.093)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < HALF_LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
      expect(result.highestValue).toBeLessThanOrEqual(0.11)
      expect(result.averageValue).toBeWithin(0.09, 0.12)

      expect(result.of(1n)).toBeWithin(0.09, 0.12)
      expect(result.of(10n)).toBeWithin(0.09, 0.12)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < HALF_LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
      expect(result.highestValue).toBeLessThanOrEqual(0.12)
      expect(result.averageValue).toBeWithin(0.10, 0.13)

      expect(result.of(1n)).toBeWithin(0.10, 0.13)
      expect(result.of(9n)).toBeWithin(0.10, 0.13)
    })
  })
})
