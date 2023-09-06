import { SeedableEngine } from '@grandom/engines'
import RandomShuffle from '../../src/RandomShuffle'

const random = new RandomShuffle(new SeedableEngine())

describe('RandomShuffle', () => {
  describe('.shuffle()', () => {
    test('strings', () => {
      for (let i = 0; i < 10_000; i++) {
        expect(random.shuffle('abc')).toBeOneOf([
          'abc', 'bca', 'bac',
          'cab', 'cba', 'acb'
        ])
      }
    })

    test('arrays', () => {
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

    test('objects', () => {
      for (let i = 0; i < 10_000; i++) {
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

    describe('errors', () => {
      test('no arguments', () => {
        // @ts-expect-error
        expect(() => random.shuffle()).toThrowWithMessage(
          TypeError,
          'Must be called with a string, array, or object, got: ' +
          'undefined (typeof === \'undefined\').'
        )
      })

      test('wrong type (null)', () => {
        // @ts-expect-error
        expect(() => random.shuffle(null)).toThrowWithMessage(
          TypeError,
          'Must be called with a string, array, or object, got: ' +
          'null (typeof === \'object\').'
        )
      })
    })
  })
})
