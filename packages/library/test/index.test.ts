import {
  LENGTH,
  BooleanStats
} from '@testyard/stats'

import grandom from '../src'

describe('grandom', () => {
  describe('default Grandom instance', () => {
    test('seed', () => {
      grandom.seed = 12345

      expect(grandom.seed).toBe(12345)
    })

    describe('.boolean()', () => {
      test('basic usage', () => {
        expect(grandom.boolean()).toBeBoolean()
      })

      describe('biased usage', () => {
        test('~50% true / ~50% false', () => {
          const { add, result } = new BooleanStats()

          for (let i = 0; i < LENGTH; i++) {
            add(grandom.boolean())
          }

          expect(result.true.percent).toBeWithin(0.49, 0.52)
          expect(result.false.percent).toBeWithin(0.49, 0.52)
        })

        test('always true', () => {
          const { add, result } = new BooleanStats()

          for (let i = 0; i < LENGTH; i++) {
            add(grandom.boolean(1))
          }

          expect(result.true.percent).toBe(1)
          expect(result.false.percent).toBe(0)
        })

        test('always false', () => {
          const { add, result } = new BooleanStats()

          for (let i = 0; i < LENGTH; i++) {
            add(grandom.boolean(0))
          }

          expect(result.true.percent).toBe(0)
          expect(result.false.percent).toBe(1)
        })
      })
    })
  })
})
