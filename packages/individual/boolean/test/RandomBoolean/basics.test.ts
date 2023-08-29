import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBoolean from '../../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())

describe('RandomBoolean', () => {
  test('default call', () => {
    const { add, result } = new BooleanStats()

    for (let i = 0; i < LENGTH; i++) {
      add(random.boolean())
    }

    expect(result.true.percent).toBeWithin(0.49, 0.52)
    expect(result.false.percent).toBeWithin(0.49, 0.52)
  })

  describe('errors', () => {
    test('wrong type', () => {
      // @ts-expect-error
      expect(() => random.boolean(false)).toThrow(TypeError)

      // @ts-expect-error
      expect(() => random.boolean(false)).toThrow('bias must be a number, got: boolean.')
    })
  })
})
