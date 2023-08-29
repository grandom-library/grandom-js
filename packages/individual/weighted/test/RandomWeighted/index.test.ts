import { BasicEngine } from '@grandom/engines'
import RandomWeighted from '../../src/RandomWeighted'

const random = new RandomWeighted(new BasicEngine())

describe('RandomWeighted', () => {
  describe('.weighted()', () => {
    describe('weight-value pair array', () => {
      test('empty weight-value array', () => {
        expect(random.weighted([])).toBeUndefined()
      })

      test('weight-value array of length === 1', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted([[1, 'a']])).toBe('a')
        }
      })

      test('weight-value array of length === 2', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted([
            [1, 'a'],
            [2, 3]
          ])).toBeOneOf(['a', 3])
        }
      })

      test('weight-value array of length === 3', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted([
            [1, 'a'],
            [2, 3],
            [3, false]
          ])).toBeOneOf(['a', 3, false])
        }
      })
    })

    describe('values array, weights array', () => {
      test('empty values, empty weights', () => {
        expect(random.weighted([], [])).toBeUndefined()
      })

      test('1 pair of value-weight', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted(['a'], [1])).toBe('a')
        }
      })

      test('2 pairs of value-weight', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted(
            ['a', 3],
            [1, 2]
          )).toBeOneOf(['a', 3])
        }
      })

      test('3 pairs of value-weight', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.weighted(
            ['a', 3, false],
            [1, 2, 3]
          )).toBeOneOf(['a', 3, false])
        }
      })
    })
  })
})
