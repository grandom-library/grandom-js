import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()
    const engine = new TestEngine()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeWithin(0.49, 0.52)
    expect(result.false.percent).toBeWithin(0.49, 0.52)
  })
})
