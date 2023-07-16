import {
  LENGTH,
  BooleanStats,
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

    expect(result.true.percent).toBeWithin(.49, .52)
    expect(result.false.percent).toBeWithin(.49, .52)
  })

  describe('errors', () => {
    test('wrong type', () => {
      // @ts-ignore
      expect(() => random.boolean(false)).toThrow(TypeError)

      // @ts-ignore
      expect(() => random.boolean(false)).toThrow('bias must be a number, got: boolean.')
    })
  })
})
