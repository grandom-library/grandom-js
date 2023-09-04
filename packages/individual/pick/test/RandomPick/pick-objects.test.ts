import {
  LENGTH,
  CharacterStats,
  IntegerStats
} from '@testyard/stats'

import { SeedableEngine } from '@grandom/engines'
import RandomPick from '../../src/RandomPick'

const random = new RandomPick(new SeedableEngine())

describe('RandomPick', () => {
  describe('.pick()', () => {
    describe('objects', () => {
      test('called with an object - no count, no options', () => {
        for (let i = 0; i < 10_000; i++) {
          const [key, value] = random.pick({ a: 1, b: 2, c: 3 })

          expect(`${key}-${value}`).toBeOneOf(['a-1', 'b-2', 'c-3'])
        }

        const characters = new CharacterStats()
        const integers = new IntegerStats()

        for (let i = 0; i < LENGTH; i++) {
          const [key, value] = random.pick({ a: 1, b: 2, c: 3 })

          characters.add(key)
          integers.add(value)
        }

        expect(characters.result.numCharacters).toBe(3)
        expect(characters.result.characters).toEqual(['a', 'b', 'c'])

        expect(characters.result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(characters.result.highestValue).toBeLessThanOrEqual(0.35)
        expect(characters.result.averageValue).toBeWithin(0.32, 0.35)

        expect(characters.result.of('a')).toBeWithin(0.32, 0.35)
        expect(characters.result.of('b')).toBeWithin(0.32, 0.35)
        expect(characters.result.of('c')).toBeWithin(0.32, 0.35)

        expect(integers.result.numEntries).toBe(3)
        expect(integers.result.integers).toEqual([1, 2, 3])

        expect(integers.result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(integers.result.highestValue).toBeLessThanOrEqual(0.35)
        expect(integers.result.averageValue).toBeWithin(0.32, 0.35)

        expect(integers.result.of(1)).toBeWithin(0.32, 0.35)
        expect(integers.result.of(2)).toBeWithin(0.32, 0.35)
        expect(integers.result.of(3)).toBeWithin(0.32, 0.35)
      })

      describe('count', () => {
        test('call with count === 3', () => {
          for (let i = 0; i < 10_000; i++) {
            const [a, b, c] = random.pick({ a: 1, b: 2, c: 3 }, 3)

            expect(`${a[0]}-${a[1]}`).toBeOneOf(['a-1', 'b-2', 'c-3'])
            expect(`${b[0]}-${b[1]}`).toBeOneOf(['a-1', 'b-2', 'c-3'])
            expect(`${c[0]}-${c[1]}`).toBeOneOf(['a-1', 'b-2', 'c-3'])
          }

          const characters = new CharacterStats()
          const integers = new IntegerStats()

          for (let i = 0; i < LENGTH; i++) {
            const [a, b, c] = random.pick({ a: 1, b: 2, c: 3 }, 3)

            characters.add(a[0])
            characters.add(b[0])
            characters.add(c[0])
            integers.add(a[1])
            integers.add(b[1])
            integers.add(c[1])
          }

          expect(characters.result.numCharacters).toBe(3)
          expect(characters.result.characters).toEqual(['a', 'b', 'c'])

          expect(characters.result.lowestValue).toBeGreaterThanOrEqual(0.32)
          expect(characters.result.highestValue).toBeLessThanOrEqual(0.35)
          expect(characters.result.averageValue).toBeWithin(0.32, 0.35)

          expect(characters.result.of('a')).toBeWithin(0.32, 0.35)
          expect(characters.result.of('b')).toBeWithin(0.32, 0.35)
          expect(characters.result.of('c')).toBeWithin(0.32, 0.35)

          expect(integers.result.numEntries).toBe(3)
          expect(integers.result.integers).toEqual([1, 2, 3])

          expect(integers.result.lowestValue).toBeGreaterThanOrEqual(0.32)
          expect(integers.result.highestValue).toBeLessThanOrEqual(0.35)
          expect(integers.result.averageValue).toBeWithin(0.32, 0.35)

          expect(integers.result.of(1)).toBeWithin(0.32, 0.35)
          expect(integers.result.of(2)).toBeWithin(0.32, 0.35)
          expect(integers.result.of(3)).toBeWithin(0.32, 0.35)
        })

        describe('errors', () => {
          test('count is a wrong type (null)', () => {
            // @ts-expect-error
            expect(() => random.pick({ a: 1, b: 2, c: 3 }, null)).toThrowWithMessage(
              TypeError,
              '2nd argument must be a number (count), or an object (options), ' +
              'got: null (typeof === \'object\').'
            )
          })

          test('count is a wrong type (false)', () => {
            // @ts-expect-error
            expect(() => random.pick({ a: 1, b: 2, c: 3 }, false)).toThrowWithMessage(
              TypeError,
              '2nd argument must be a number (count), or an object (options), ' +
              'got: false (typeof === \'boolean\').'
            )
          })

          describe('count is a useless / out of range number', () => {
            test('count === 0', () => {
              expect(() => random.pick({ a: 1, b: 2, c: 3 }, 0)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 0.'
              )
            })

            test('count === NaN', () => {
              expect(() => random.pick({ a: 1, b: 2, c: 3 }, NaN)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: NaN.'
              )
            })

            test('count === Number.MAX_SAFE_INTEGER + 1', () => {
              expect(() => random.pick({ a: 1, b: 2, c: 3 }, Number.MAX_SAFE_INTEGER + 1))
                .toThrowWithMessage(
                  RangeError,
                  'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: 9007199254740992.'
                )
            })

            test('count === -Infinity', () => {
              expect(() => random.pick({ a: 1, b: 2, c: 3 }, -Infinity)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: -Infinity.'
              )
            })

            test('count === Infinity', () => {
              expect(() => random.pick({ a: 1, b: 2, c: 3 }, Infinity)).toThrowWithMessage(
                RangeError,
                'Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: Infinity.'
              )
            })
          })
        })
      })

      describe('options', () => {
        describe('fallback', () => {
          test('fallback with the default value (undefined)', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick({})).toBeUndefined()
            }
          })

          test('fallback with a custom value', () => {
            for (let i = 0; i < 10_000; i++) {
              expect(random.pick({}, { default: false })).toBe(false)
            }
          })
        })

        describe('errors', () => {
          test('options is a wrong type (null)', () => {
            // @ts-expect-error
            expect(() => random.pick({ a: 1, b: 2, c: 3 }, 1, null)).toThrowWithMessage(
              TypeError,
              '3rd argument must be an object (options), got: null (typeof === \'object\').'
            )
          })

          test('options is a wrong type (false)', () => {
            // @ts-expect-error
            expect(() => random.pick({ a: 1, b: 2, c: 3 }, 1, false)).toThrowWithMessage(
              TypeError,
              '3rd argument must be an object (options), got: false (typeof === \'boolean\').'
            )
          })
        })
      })
    })
  })
})
