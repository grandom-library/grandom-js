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

    test('._next() is implemented', () => {
      const engine = new TestEngine()

      expect(engine.nextBoolean()).toBeBoolean()
    })
  })

  describe('errors', () => {
    describe('invalid constructor arguments', () => {
      test('invalid constructor argument (no argument passed)', () => {
        // @ts-expect-error
        expect(() => new RandomEngine()).toThrowWithMessage(
          TypeError,
          'Name must be a non-empty, non-blank string, got: undefined (typeof === \'undefined\').'
        )
      })

      test('invalid constructor argument (wrong type)', () => {
        // @ts-expect-error
        expect(() => new RandomEngine(null)).toThrowWithMessage(
          TypeError,
          'Name must be a non-empty, non-blank string, got: null (typeof === \'object\').'
        )
      })

      test('invalid constructor argument (empty string)', () => {
        expect(() => new RandomEngine('')).toThrowWithMessage(
          TypeError,
          'Name must be a non-empty, non-blank string, got: "" (length === 0).'
        )
      })

      test('invalid constructor argument (blank string)', () => {
        expect(() => new RandomEngine('   ')).toThrowWithMessage(
          TypeError,
          'Name must be a non-empty, non-blank string, got: "   " (length === 3).'
        )
      })
    })

    test('_next must be implemented', () => {
      const engine = new RandomEngine('test')

      expect(() => engine.nextBoolean()).toThrowWithMessage(
        Error,
        '_next() must be implemented.'
      )
    })
  })
})
