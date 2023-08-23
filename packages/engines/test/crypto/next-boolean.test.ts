import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import CryptoEngine from '../../src/crypto'

const HALF_LENGTH = LENGTH / 2
const engine = new CryptoEngine()

describe('CryptoEngine', () => {
  test('.nextBoolean()', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < HALF_LENGTH; i++) {
      add(engine.nextBoolean())
    }

    expect(result.true.percent).toBeWithin(0.49, 0.52)
    expect(result.false.percent).toBeWithin(0.49, 0.52)
  })
})
