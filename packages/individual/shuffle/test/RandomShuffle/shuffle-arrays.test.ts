import { BasicEngine } from '@grandom/engines'
import RandomShuffle from '../../src/RandomShuffle'

const random = new RandomShuffle(new BasicEngine())

describe('RandomShuffle', () => {
  describe('.shuffle()', () => {
    describe('arrays', () => {
      test('shuffle an empty array', () => {
        expect(random.shuffle([])).toEqual([])
      })

      test('shuffle a length === 1 array', () => {
        expect(random.shuffle([1])).toEqual([1])
      })

      test('shuffle a length === 2 array', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random.shuffle([1, 'a'])).toBeOneOf([[1, 'a'], ['a', 1]])
        }
      })

      test('shuffle a length === 3 array', () => {
        for (let i = 0; i < 1000; i++) {
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
})
