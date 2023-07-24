import {
  LENGTH,
  IntegerStats,
  StringStats,
  CharacterStats,
} from '@testyard/stats'

import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}

describe('RandomEngine', () => {
  describe('.pickString()', () => {
    test('call with an empty string', () => {
      const engine = new TestEngine()

      expect(engine.pickString('')).toBe('')
    })

    test('shorter string', () => {
      const engine = new TestEngine()
      const strings = new StringStats()
      const characters = new CharacterStats()

      let str: string

      for (let i = 0; i < LENGTH; i++) {
        str = engine.pickString('123')

        strings.add(str)
        characters.add(str)
      }

      expect(strings.result.lowestLength).toBe(1)
      expect(strings.result.highestLength).toBe(1)
      expect(strings.result.averageLength).toBe(1)

      expect(strings.result.characters).toBe('123')

      expect(characters.result.numCharacters).toBe(3)
      expect(characters.result.characters).toEqual(['1', '2', '3',])

      expect(characters.result.lowestValue).toBeGreaterThanOrEqual(0.32)
      expect(characters.result.highestValue).toBeLessThanOrEqual(0.35)
      expect(characters.result.averageValue).toBeWithin(0.32, 0.35)

      expect(characters.result.of('1')).toBeWithin(0.32, 0.35)
      expect(characters.result.of('2')).toBeWithin(0.32, 0.35)
      expect(characters.result.of('3')).toBeWithin(0.32, 0.35)
    })

    test('longer string', () => {
      const engine = new TestEngine()
      const strings = new StringStats()
      const characters = new CharacterStats()

      let str: string

      for (let i = 0; i < LENGTH; i++) {
        str = engine.pickString('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

        strings.add(str)
        characters.add(str)
      }

      expect(strings.result.lowestLength).toBe(1)
      expect(strings.result.highestLength).toBe(1)
      expect(strings.result.averageLength).toBe(1)

      expect(strings.result.characters).toBe('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

      expect(characters.result.numCharacters).toBe(62)

      expect(characters.result.lowestValue).toBeGreaterThanOrEqual(0.015)
      expect(characters.result.highestValue).toBeLessThanOrEqual(0.018)
      expect(characters.result.averageValue).toBeWithin(0.015, 0.018)

      expect(characters.result.of('0')).toBeWithin(0.015, 0.018)
      expect(characters.result.of('9')).toBeWithin(0.015, 0.018)

      expect(characters.result.of('A')).toBeWithin(0.015, 0.018)
      expect(characters.result.of('a')).toBeWithin(0.015, 0.018)

      expect(characters.result.of('F')).toBeWithin(0.015, 0.018)
      expect(characters.result.of('f')).toBeWithin(0.015, 0.018)

      expect(characters.result.of('Z')).toBeWithin(0.015, 0.018)
      expect(characters.result.of('z')).toBeWithin(0.015, 0.018)
    })
  })

  describe('.pickArray()', () => {
    test('call with an empty array', () => {
      const engine = new TestEngine()

      expect(engine.pickArray([])).toBe(undefined)
    })

    test('call with a short array', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.pickArray([1, 2, 3]))
      }

      expect(result.numEntries).toBe(3)
      expect(result.integers).toEqual([1, 2, 3])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.32)
      expect(result.highestValue).toBeLessThanOrEqual(.34)
      expect(result.averageValue).toBeWithin(.32, .35)

      expect(result.of(1)).toBeWithin(.32, .35)
      expect(result.of(2)).toBeWithin(.32, .35)
      expect(result.of(3)).toBeWithin(.32, .35)
    })

    test('call with a longer array', () => {
      const { add, result } = new IntegerStats()
      const engine = new TestEngine()

      for (let i = 0; i < LENGTH; i++) {
        add(engine.pickArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
      }

      expect(result.numEntries).toBe(10)
      expect(result.integers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

      expect(result.lowestValue).toBeGreaterThanOrEqual(.08)
      expect(result.highestValue).toBeLessThanOrEqual(.11)
      expect(result.averageValue).toBeWithin(.08, .12)

      expect(result.of(0)).toBeWithin(.08, .12)
      expect(result.of(5)).toBeWithin(.08, .12)
      expect(result.of(9)).toBeWithin(.08, .12)
    })
  })
})
