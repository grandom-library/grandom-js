import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomBoolean from '../../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())

describe('RandomBoolean', () => {
  describe('call with bias', () => {
    describe('bias is nonsense/useless', () => {
      test('bias === -0 => always false', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(-0))
        }

        expect(result.true.percent).toBe(0)
        expect(result.false.percent).toBe(1)
      })

      test('bias < 0 => always false', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(-1))
        }

        expect(result.true.percent).toBe(0)
        expect(result.false.percent).toBe(1)
      })

      test('bias > 1 => always true', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(2))
        }

        expect(result.true.percent).toBe(1)
        expect(result.false.percent).toBe(0)
      })

      test('bias === -Infinity => always false', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(-Infinity))
        }

        expect(result.true.percent).toBe(0)
        expect(result.false.percent).toBe(1)
      })

      test('bias === Infinity => always true', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(Infinity))
        }

        expect(result.true.percent).toBe(1)
        expect(result.false.percent).toBe(0)
      })

      test('bias === NaN => ~50% true / ~50% false', () => {
        const { add, result } = new BooleanStats()

        for (let i = 0; i < LENGTH; i++) {
          add(random.boolean(NaN))
        }

        expect(result.true.percent).toBeWithin(0.49, 0.52)
        expect(result.false.percent).toBeWithin(0.49, 0.52)
      })
    })
  })
})
