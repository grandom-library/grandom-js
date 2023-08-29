import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import boolean from '../src'

describe('@grandom/boolean', () => {
  test('default call', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(boolean())
    }

    expect(result.true.percent).toBeWithin(0.49, 0.52)
    expect(result.false.percent).toBeWithin(0.49, 0.52)
  })

  test('biased call - always true', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(boolean(1))
    }

    expect(result.true.percent).toBe(1)
    expect(result.false.percent).toBe(0)
  })

  test('biased call - always false', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(boolean(0))
    }

    expect(result.true.percent).toBe(0)
    expect(result.false.percent).toBe(1)
  })
})
