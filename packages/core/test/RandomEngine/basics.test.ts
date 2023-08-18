import RandomEngine from '../../src/RandomEngine'

import { TestEngine } from '../fixtures'

describe('RandomEngine', () => {
  describe('basics', () => {
    test('constants', () => {
      expect(RandomEngine.DEFAULT_INCLUDE_MINIMUM).toBe(true)
      expect(RandomEngine.DEFAULT_INCLUDE_MAXIMUM).toBe(false)

      expect(RandomEngine.DEFAULT_FLOAT_MINIMUM).toBe(0)
      expect(RandomEngine.DEFAULT_FLOAT_MAXIMUM).toBe(1)

      expect(RandomEngine.DEFAULT_INTEGER_MINIMUM).toBe(0)
      expect(RandomEngine.DEFAULT_INTEGER_MAXIMUM).toBe(4_294_967_296)

      expect(RandomEngine.DEFAULT_BIGINT_MINIMUM).toBe(0n)
      expect(RandomEngine.DEFAULT_BIGINT_MAXIMUM).toBe(18_446_744_073_709_551_616n)
    })

    test('name', () => {
      const engine = new TestEngine()

      expect(engine.name).toBe('test-engine')
    })

    test('isSeedSupported', () => {
      const engine = new TestEngine()

      expect(engine.isSeedSupported).toBe(false)
    })

    test('._next() is implemented', () => {
      const engine = new TestEngine()

      expect(engine.nextBoolean()).toBeBoolean()
    })
  })

  describe('errors', () => {
    const engine = new RandomEngine('test')

    test('_isSeedSupported must be implemented', () => {
      expect(() => engine.isSeedSupported).toThrowWithMessage(
        Error,
        '_isSeedSupported() must be implemented.'
      )
    })

    test('_next must be implemented', () => {
      expect(() => engine.nextBoolean()).toThrowWithMessage(
        Error,
        '_next() must be implemented.'
      )
    })
  })
})
