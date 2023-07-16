import {
  LENGTH,
  BigIntStats
} from '@testyard/stats'

import BasicEngine from '..'

const engine = new BasicEngine()

describe('BasicEngine', () => {
  describe('.nextBigInt()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)
      expect(result.averageValue).toBeWithin(.09, .12)

      expect(result.of(0n)).toBeWithin(.09, .12)
      expect(result.of(9n)).toBeWithin(.09, .12)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.089)
      expect(result.highestValue).toBeLessThanOrEqual(.092)
      expect(result.averageValue).toBeWithin(.089, .093)

      expect(result.of(0n)).toBeWithin(.089, .093)
      expect(result.of(10n)).toBeWithin(.089, .093)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)
      expect(result.averageValue).toBeWithin(.09, .12)

      expect(result.of(1n)).toBeWithin(.09, .12)
      expect(result.of(10n)).toBeWithin(.09, .12)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new BigIntStats()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.10)
      expect(result.highestValue).toBeLessThanOrEqual(.12)
      expect(result.averageValue).toBeWithin(.10, .13)

      expect(result.of(1n)).toBeWithin(.10, .13)
      expect(result.of(9n)).toBeWithin(.10, .13)
    })
  })
})
