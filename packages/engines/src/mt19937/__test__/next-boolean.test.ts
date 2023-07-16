import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import MT19937Engine from '..'

const engine = new MT19937Engine()

describe('MT19937Engine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeWithin(.49, .52)
    expect(result.false.percent).toBeWithin(.49, .52)
  })
})
