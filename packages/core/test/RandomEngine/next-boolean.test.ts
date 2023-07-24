import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

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

    expect(result.true.percent).toBeWithin(.49, .52)
    expect(result.false.percent).toBeWithin(.49, .52)
  })
})
