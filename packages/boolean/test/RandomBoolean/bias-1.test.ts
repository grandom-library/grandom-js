import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBoolean from '../../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())

describe('RandomBoolean', () => {
  describe('call with bias', () => {
    test('always true', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(1))
      }

      expect(result.true.percent).toBe(1)
      expect(result.false.percent).toBe(0)
    })

    test('always false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0))
      }

      expect(result.true.percent).toBe(0)
      expect(result.false.percent).toBe(1)
    })

    test('~50% true / ~50% false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0.5))
      }

      expect(result.true.percent).toBeWithin(0.49, 0.52)
      expect(result.false.percent).toBeWithin(0.49, 0.52)
    })

    test('~25% true / ~75% false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0.25))
      }

      expect(result.true.percent).toBeWithin(0.24, 0.27)
      expect(result.false.percent).toBeWithin(0.74, 0.77)
    })

    test('~75% true / ~25% false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0.75))
      }

      expect(result.true.percent).toBeWithin(0.74, 0.77)
      expect(result.false.percent).toBeWithin(0.24, 0.27)
    })

    test('~1% true / ~99% false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0.01))
      }

      expect(result.true.percent).toBeWithin(0.009, 0.012)
      expect(result.false.percent).toBeWithin(0.98, 0.999_999)
    })

    test('~99% true / ~1% false', () => {
      const { add, result } = new BooleanStats()

      for (let i = 0; i < LENGTH; i++) {
        add(random.boolean(0.99))
      }

      expect(result.true.percent).toBeWithin(0.98, 0.999_999)
      expect(result.false.percent).toBeWithin(0.009, 0.012)
    })
  })
})
