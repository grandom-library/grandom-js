import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import BasicEngine from '..'

const engine = new BasicEngine()

describe('BasicEngine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeWithin(.49, .52)
    expect(result.false.percent).toBeWithin(.49, .52)
  })
})
