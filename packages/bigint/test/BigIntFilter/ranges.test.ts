import IntegerFilter from '../../src/BigIntFilter'

describe('IntegerFilter', () => {
  describe('ranges', () => {
    test('single range', () => {
      const filter = new IntegerFilter('1n-2n')

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(0n)).toBe(false)
      expect(filter.matches(1n)).toBe(true)
      expect(filter.matches(2n)).toBe(true)
      expect(filter.matches(3n)).toBe(false)
    })

    test('2 ranges', () => {
      const filter = new IntegerFilter(['1n-2n', '4n-5n'])

      expect(filter.numFilters).toBe(2)

      expect(filter.matches(0n)).toBe(false)
      expect(filter.matches(1n)).toBe(true)
      expect(filter.matches(2n)).toBe(true)
      expect(filter.matches(3n)).toBe(false)
      expect(filter.matches(4n)).toBe(true)
      expect(filter.matches(5n)).toBe(true)
      expect(filter.matches(6n)).toBe(false)
    })
  })
})
