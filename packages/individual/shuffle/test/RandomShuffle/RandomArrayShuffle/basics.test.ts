import { SeedableEngine } from '@grandom/engines'
import RandomArrayShuffle from '../../../src/RandomShuffle/RandomArrayShuffle'

const random = new RandomArrayShuffle(new SeedableEngine())

describe('RandomArrayShuffle', () => {
  describe('.shuffle()', () => {
    test('shuffle an empty array', () => {
      expect(random.shuffle([])).toEqual([])
    })

    test('shuffle a length === 1 array', () => {
      expect(random.shuffle([1])).toEqual([1])
    })

    test('shuffle a length === 2 array', () => {
      for (let i = 0; i < 10_000; i++) {
        expect(random.shuffle([1, 'a'])).toBeOneOf([[1, 'a'], ['a', 1]])
      }
    })

    test('shuffle a length === 3 array', () => {
      for (let i = 0; i < 10_000; i++) {
        expect(random.shuffle([1, 'a', true])).toBeOneOf([
          [1, 'a', true],
          ['a', 1, true],
          ['a', true, 1],
          [1, true, 'a'],
          [true, 'a', 1],
          [true, 1, 'a']
        ])
      }
    })
  })
})
