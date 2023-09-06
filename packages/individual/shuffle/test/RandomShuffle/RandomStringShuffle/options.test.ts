import { SeedableEngine } from '@grandom/engines'
import RandomStringShuffle from '../../../src/RandomShuffle/RandomStringShuffle'

const random = new RandomStringShuffle(new SeedableEngine())

describe('RandomStringShuffle', () => {
  describe('.shuffle()', () => {
    describe('exclude', () => {
      test('exclude a string', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: 'b' }))
            .toBeOneOf(['ac', 'ca'])
        }
      })

      test('exclude a string[]', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: ['b'] }))
            .toBeOneOf(['ac', 'ca'])
        }

        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: ['a', 'b'] }))
            .toBe('c')
        }

        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: ['a', 'b', 'c'] }))
            .toBe('')
        }
      })

      test('exclude a RegExp', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: /a/ }))
            .toBeOneOf(['bc', 'cb'])
        }
      })

      test('exclude a RegExp[]', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: [/a/] }))
            .toBeOneOf(['bc', 'cb'])
        }

        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: [/a/, /c/] }))
            .toBe('b')
        }

        for (let i = 0; i < 10_000; i++) {
          expect(random.shuffle('abc', { exclude: [/a/, /b/, /c/] }))
            .toBe('')
        }
      })
    })

    describe('filter', () => {
      test('filter out a string', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(
            random.shuffle(
              'abc',
              {
                filter: (character) => {
                  if (character === 'b') {
                    return false
                  }

                  return true
                }
              }
            )
          ).toBeOneOf(['ac', 'ca'])
        }
      })

      test('filter out multiple strings', () => {
        for (let i = 0; i < 10_000; i++) {
          expect(
            random.shuffle(
              'abc',
              {
                filter: (character) => {
                  if (character === 'a' || character === 'c') {
                    return false
                  }

                  return true
                }
              }
            )
          ).toBe('b')
        }

        for (let i = 0; i < 10_000; i++) {
          expect(
            random.shuffle(
              'abc',
              {
                filter: (character) => {
                  if (character === 'a' || character === 'b' || character === 'c') {
                    return false
                  }

                  return true
                }
              }
            )
          ).toBe('')
        }
      })
    })
  })
})
