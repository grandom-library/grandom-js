import {
  LENGTH,
  CharacterStats
} from '@testyard/stats'

import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  describe('.nextString()', () => {
    describe('length', () => {
      test('length === 0', () => {
        const engine = new TestEngine()

        for (let i = 0; i < 1_000; i++) {
          expect(engine.nextString(0, '')).toBe('')
          expect(engine.nextString(0, 'abc')).toBe('')
        }
      })

      test('length === 1', () => {
        const engine = new TestEngine()

        for (let i = 0; i < 1_000; i++) {
          expect(engine.nextString(1, 'a')).toBe('a')
          expect(engine.nextString(1, 'b')).toBe('b')
          expect(engine.nextString(1, 'c')).toBe('c')
        }
      })

      test('length === 2', () => {
        const engine = new TestEngine()

        for (let i = 0; i < 1_000; i++) {
          expect(engine.nextString(2, 'a')).toBe('aa')
          expect(engine.nextString(2, 'b')).toBe('bb')
          expect(engine.nextString(2, 'c')).toBe('cc')
        }
      })

      test('length === 3', () => {
        const engine = new TestEngine()

        for (let i = 0; i < 1_000; i++) {
          expect(engine.nextString(3, 'a')).toBe('aaa')
          expect(engine.nextString(3, 'b')).toBe('bbb')
          expect(engine.nextString(3, 'c')).toBe('ccc')
        }
      })
    })

    describe('basics', () => {
      test('short set of characters', () => {
        const { add, result } = new CharacterStats()
        const engine = new TestEngine()

        for (let i = 0; i < LENGTH; i++) {
          add(engine.nextString(10, 'abc'))
        }

        expect(result.numCharacters).toBe(3)
        expect(result.characters).toEqual(['a', 'b', 'c'])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.32)
        expect(result.highestValue).toBeLessThanOrEqual(0.35)
        expect(result.averageValue).toBeWithin(0.32, 0.35)

        expect(result.of('a')).toBeWithin(0.32, 0.35)
        expect(result.of('b')).toBeWithin(0.32, 0.35)
        expect(result.of('c')).toBeWithin(0.32, 0.35)
      })

      test('full set of English characters', () => {
        const { add, result } = new CharacterStats()
        const engine = new TestEngine()

        for (let i = 0; i < LENGTH; i++) {
          add(engine.nextString(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'))
        }

        expect(result.numCharacters).toBe(52)
        expect(result.characters).toEqual([
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
          'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
          'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ])

        expect(result.lowestValue).toBeGreaterThanOrEqual(0.018)
        expect(result.highestValue).toBeLessThanOrEqual(0.021)
        expect(result.averageValue).toBeWithin(0.018, 0.021)

        expect(result.of('a')).toBeWithin(0.018, 0.021)
        expect(result.of('A')).toBeWithin(0.018, 0.021)
        expect(result.of('m')).toBeWithin(0.018, 0.021)
        expect(result.of('M')).toBeWithin(0.018, 0.021)
        expect(result.of('z')).toBeWithin(0.018, 0.021)
        expect(result.of('Z')).toBeWithin(0.018, 0.021)
      })
    })
  })
})
