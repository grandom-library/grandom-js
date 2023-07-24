import {
  StringStats,
  CharacterStats
} from '@testyard/stats'

import { BasicEngine } from '@grandom/engines'
import RandomString from '../../src/RandomString'

const random = new RandomString(new BasicEngine())

describe('RandomString', () => {
  describe('call with options -> .random({ ... })', () => {
    test('empty object -> .random({})', () => {
      const strings = new StringStats()
      const characters = new CharacterStats()

      let str: string

      for (let i = 0; i < 100_000; i++) {
        str = random.string({})

        strings.add(str)
        characters.add(str)
      }

      expect(strings.result.lowestLength).toBe(16)
      expect(strings.result.highestLength).toBe(16)
      expect(strings.result.averageLength).toBe(16)

      expect(strings.result.characters).toBe(
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      )
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

    test('length === 4 -> .random({ length: 4 })', () => {
      const strings = new StringStats()
      const characters = new CharacterStats()

      let str: string

      for (let i = 0; i < 100_000; i++) {
        str = random.string({ length: 4 })

        strings.add(str)
        characters.add(str)
      }

      expect(strings.result.lowestLength).toBe(4)
      expect(strings.result.highestLength).toBe(4)
      expect(strings.result.averageLength).toBe(4)

      expect(strings.result.characters).toBe(
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      )
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
})
