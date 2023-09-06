import { SeedableEngine } from '@grandom/engines'
import RandomStringShuffle from '../../../src/RandomShuffle/RandomStringShuffle'

const random = new RandomStringShuffle(new SeedableEngine())

describe('RandomStringShuffle', () => {
  describe('.shuffle()', () => {
    describe('strings', () => {
      test('shuffle an empty string', () => {
        expect(random.shuffle('')).toBe('')
      })

      test('shuffle a length === 1 string', () => {
        expect(random.shuffle('a')).toBe('a')
      })

      test('shuffle a length === 2 string', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('ab')).toBeOneOf(['ab', 'ba'])
        }
      })

      test('shuffle a length === 3 string', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc')).toBeOneOf([
            'abc',
            'bca',
            'bac',
            'cab',
            'cba',
            'acb'
          ])
        }
      })
    })

    describe('errors', () => {
      test('no arguments', () => {
        // @ts-expect-error
        expect(() => random.shuffle()).toThrowWithMessage(
          TypeError,
          'Must be called with a string, got: undefined (typeof === \'undefined\').'
        )
      })

      test('wrong type (null)', () => {
        // @ts-expect-error
        expect(() => random.shuffle(null)).toThrowWithMessage(
          TypeError,
          'Must be called with a string, got: null (typeof === \'object\').'
        )
      })
    })
  })
})
