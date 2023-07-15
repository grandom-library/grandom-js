import { BigIntStats } from '@testyard/stats'

import { LENGTH } from '..'
import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}

describe('RandomEngine', () => {
  describe('.nextBigInt()', () => {
    test('include minimum, exclude maximum - range [minimum, maximum)', () => {
      const { add, result } = new BigIntStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, false))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)

      expect(result.averageValue).toBeGreaterThanOrEqual(.09)
      expect(result.averageValue).toBeLessThanOrEqual(.11)

      expect(result.of(0n)).toBeGreaterThanOrEqual(.09)
      expect(result.of(0n)).toBeLessThanOrEqual(.11)
      expect(result.of(9n)).toBeGreaterThanOrEqual(.09)
      expect(result.of(9n)).toBeLessThanOrEqual(.11)
    })

    test('include minimum, include maximum - range [minimum, maximum]', () => {
      const { add, result } = new BigIntStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, true, true))
      }

      expect(result.numEntries).toBe(11)
      expect(result.bigints).toEqual([
        '0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.090)
      expect(result.highestValue).toBeLessThanOrEqual(.092)

      expect(result.averageValue).toBeGreaterThanOrEqual(.090)
      expect(result.averageValue).toBeLessThanOrEqual(.092)

      expect(result.of(0n)).toBeGreaterThanOrEqual(.090)
      expect(result.of(0n)).toBeLessThanOrEqual(.092)
      expect(result.of(10n)).toBeGreaterThanOrEqual(.090)
      expect(result.of(10n)).toBeLessThanOrEqual(.092)
    })

    test('exclude minimum, include maximum - range (minimum, maximum]', () => {
      const { add, result } = new BigIntStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, true))
      }

      expect(result.numEntries).toBe(10)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n', '10n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.09)
      expect(result.highestValue).toBeLessThanOrEqual(.11)

      expect(result.averageValue).toBeGreaterThanOrEqual(.09)
      expect(result.averageValue).toBeLessThanOrEqual(.11)

      expect(result.of(1n)).toBeGreaterThanOrEqual(.09)
      expect(result.of(1n)).toBeLessThanOrEqual(.11)
      expect(result.of(10n)).toBeGreaterThanOrEqual(.09)
      expect(result.of(10n)).toBeLessThanOrEqual(.11)
    })

    test('exclude minimum, exclude maximum - range (minimum, maximum)', () => {
      const { add, result } = new BigIntStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.nextBigInt(0n, 10n, false, false))
      }

      expect(result.numEntries).toBe(9)
      expect(result.bigints).toEqual([
        '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n', '9n'
      ])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.10)
      expect(result.highestValue).toBeLessThanOrEqual(.12)

      expect(result.averageValue).toBeGreaterThanOrEqual(.10)
      expect(result.averageValue).toBeLessThanOrEqual(.12)

      expect(result.of(1n)).toBeGreaterThanOrEqual(.10)
      expect(result.of(1n)).toBeLessThanOrEqual(.12)
      expect(result.of(9n)).toBeGreaterThanOrEqual(.10)
      expect(result.of(9n)).toBeLessThanOrEqual(.12)
    })
  })
})
