import {
  LENGTH,
  IntegerStats,
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomInteger from '../../../src/integer/RandomInteger'

const random = new RandomInteger(new BasicEngine())

describe('RandomInteger', () => {
  test('default call', () => {
    const result = random.integer()

    expect(result).toBeWithin(0, Number.MAX_SAFE_INTEGER)
  })

  test('call with maximum', () => {
    const { add, result } = new IntegerStats()

    for (let i = 0; i < LENGTH; i++) {
      add(random.integer(9))
    }

    expect(result.numEntries).toBe(9)
    expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.10)
    expect(result.highestValue).toBeLessThanOrEqual(0.12)
    expect(result.averageValue).toBeWithin(0.10, 0.12)

    expect(result.of(0)).toBeWithin(0.10, 0.12)
    expect(result.of(8)).toBeWithin(0.10, 0.12)
  })

  test('call with minimum and maximum', () => {
    const { add, result } = new IntegerStats()

    for (let i = 0; i < LENGTH; i++) {
      add(random.integer(-4, 6))
    }

    expect(result.numEntries).toBe(10)
    expect(result.integers).toEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4, 5])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
    expect(result.highestValue).toBeLessThanOrEqual(0.12)
    expect(result.averageValue).toBeWithin(0.09, 0.12)

    expect(result.of(-4)).toBeWithin(0.09, 0.12)
    expect(result.of(5)).toBeWithin(0.09, 0.12)
  })
})
