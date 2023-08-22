import { BasicEngine } from '@grandom/engines'
import RandomShuffle from '../../src/RandomShuffle'

const random = new RandomShuffle(new BasicEngine())

describe('RandomShuffle', () => {
  describe('.shuffle()', () => {
    describe('objects', () => {
      test('shuffle an empty object', () => {
        expect(random.shuffle({})).toEqual({})
      })

      test('shuffle an object with 1 key-value', () => {
        expect(JSON.stringify(random.shuffle({ a: 1 }))).toBe('{"a":1}')
      })

      test('shuffle an object with 2 key-values', () => {
        for (let i = 0; i < 1000; i++) {
          expect(JSON.stringify(random.shuffle({ a: 1, b: 2 }))).toBeOneOf([
            '{"a":1,"b":2}',
            '{"b":2,"a":1}'
          ])
        }
      })

      test('shuffle an object with 3 key-values', () => {
        for (let i = 0; i < 1000; i++) {
          expect(JSON.stringify(random.shuffle({ a: 1, b: 2, c: 3 }))).toBeOneOf([
            '{"a":1,"b":2,"c":3}',
            '{"a":1,"c":3,"b":2}',
            '{"b":2,"a":1,"c":3}',
            '{"b":2,"c":3,"a":1}',
            '{"c":3,"b":2,"a":1}',
            '{"c":3,"a":1,"b":2}'
          ])
        }
      })
    })
  })
})
