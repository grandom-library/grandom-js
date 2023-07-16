import RandomEngine from '../../src/RandomEngine'

describe('RandomEngine', () => {
  describe('basics', () => {
    test('constants', () => {
      expect(RandomEngine.DEFAULT_FLOAT_MINIMUM).toBe(0)
      expect(RandomEngine.DEFAULT_FLOAT_MAXIMUM).toBe(1)

      expect(RandomEngine.DEFAULT_INTEGER_MINIMUM).toBe(0)
      expect(RandomEngine.DEFAULT_INTEGER_MAXIMUM).toBe(4_294_967_296)

      expect(RandomEngine.DEFAULT_BIGINT_MINIMUM).toBe(0n)
      expect(RandomEngine.DEFAULT_BIGINT_MAXIMUM).toBe(18_446_744_073_709_551_616n)
    })
  })
})
