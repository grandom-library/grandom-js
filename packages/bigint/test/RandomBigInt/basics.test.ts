import {
  LENGTH,
  BigIntStats,
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBigInt from '../../src/RandomBigInt'

const random = new RandomBigInt(new BasicEngine())

describe('RandomBigInt', () => {
  test('default call', () => {
    const result = random.bigint()

    expect(result).toBeGreaterThanOrEqual(0n)
  })

  test('call with maximum', () => {
    const { add, result } = new BigIntStats()

    for (let i = 0; i < LENGTH; i++) {
      add(random.bigint(9n))
    }

    expect(result.numEntries).toBe(9)
    expect(result.bigints).toEqual(['0n', '1n', '2n', '3n', '4n', '5n', '6n', '7n', '8n'])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
    expect(result.highestValue).toBeLessThanOrEqual(0.12)
    expect(result.averageValue).toBeWithin(0.10, 0.12)

    expect(result.of(0n)).toBeWithin(0.10, 0.12)
    expect(result.of(8n)).toBeWithin(0.10, 0.12)
  })

  test('call with minimum and maximum', () => {
    const { add, result } = new BigIntStats()

    for (let i = 0; i < LENGTH; i++) {
      add(random.bigint(-4n, 6n))
    }

    expect(result.numEntries).toBe(10)
    expect(result.bigints).toEqual(['-4n', '-3n', '-2n', '-1n', '0n', '1n', '2n', '3n', '4n', '5n'])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
    expect(result.highestValue).toBeLessThanOrEqual(0.12)
    expect(result.averageValue).toBeWithin(0.09, 0.12)

    expect(result.of(-4n)).toBeWithin(0.09, 0.12)
    expect(result.of(5n)).toBeWithin(0.09, 0.12)
  })
})
