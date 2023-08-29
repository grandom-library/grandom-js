import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import MT19937Engine from '../../src/mt19937'

const engine = new MT19937Engine()

describe('MT19937Engine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeWithin(0.49, 0.52)
    expect(result.false.percent).toBeWithin(0.49, 0.52)
  })
})
