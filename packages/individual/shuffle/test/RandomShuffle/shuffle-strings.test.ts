import { BasicEngine } from '@grandom/engines'
import RandomShuffle from '../../src/RandomShuffle'

const random = new RandomShuffle(new BasicEngine())

describe('RandomShuffle', () => {
  describe('.shuffle()', () => {
    describe('strings', () => {
      test('shuffle an empty string', () => {
        expect(random.shuffle('')).toBe('')
      })

      test('shuffle a length === 1 string', () => {
        expect(random.shuffle('a')).toBe('a')
      })

      test('shuffle a length === 2 string', () => {
        for (let i = 0; i < 1000; i++) {
          expect(random.shuffle('ab')).toBeOneOf(['ab', 'ba'])
        }
      })

      test('shuffle a length === 3 string', () => {
        for (let i = 0; i < 1000; i++) {
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

      describe('exclude characters', () => {
        test('exclude a string', () => {
          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: 'b' })).toBeOneOf(['ac', 'ca'])
          }
        })

        test('exclude a string[]', () => {
          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: ['b'] })).toBeOneOf(['ac', 'ca'])
          }

          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: ['a', 'b'] })).toBe('c')
          }

          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: ['a', 'b', 'c'] })).toBe('')
          }
        })

        test('exclude a RegExp', () => {
          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: /a/ })).toBeOneOf(['bc', 'cb'])
          }
        })

        test('exclude a RegExp[]', () => {
          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: [/a/] })).toBeOneOf(['bc', 'cb'])
          }

          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: [/a/, /c/] })).toBe('b')
          }

          for (let i = 0; i < 1000; i++) {
            expect(random.shuffle('abc', { excludeCharacter: [/a/, /b/, /c/] })).toBe('')
          }
        })
      })

      describe('filter out characters', () => {
        test('filter out a string', () => {
          for (let i = 0; i < 1000; i++) {
            expect(
              random.shuffle(
                'abc',
                {
                  filterCharacter: (character) => {
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
          for (let i = 0; i < 1000; i++) {
            expect(
              random.shuffle(
                'abc',
                {
                  filterCharacter: (character) => {
                    if (character === 'a' || character === 'c') {
                      return false
                    }

                    return true
                  }
                }
              )
            ).toBe('b')
          }

          for (let i = 0; i < 1000; i++) {
            expect(
              random.shuffle(
                'abc',
                {
                  filterCharacter: (character) => {
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
})
