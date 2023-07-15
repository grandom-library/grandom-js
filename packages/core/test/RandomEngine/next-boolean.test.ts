import { BooleanStats } from '@testyard/stats'

import { LENGTH } from '..'
import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}

describe('RandomEngine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()
    const engine = new TestEngine()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeGreaterThanOrEqual(.49)
    expect(result.true.percent).toBeLessThanOrEqual(.51)

    expect(result.false.percent).toBeGreaterThanOrEqual(.49)
    expect(result.false.percent).toBeLessThanOrEqual(.51)
  })
})
