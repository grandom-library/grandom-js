import IntegerFilter from '../../../src/integer/IntegerFilter'

describe('IntegerFilter', () => {
  describe('ranges', () => {
    test('single range', () => {
      const filter = new IntegerFilter('1-2')

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(0)).toBe(false)
      expect(filter.matches(1)).toBe(true)
      expect(filter.matches(2)).toBe(true)
      expect(filter.matches(3)).toBe(false)
    })

    test('2 ranges', () => {
      const filter = new IntegerFilter(['1-2', '4-5'])

      expect(filter.numFilters).toBe(2)

      expect(filter.matches(0)).toBe(false)
      expect(filter.matches(1)).toBe(true)
      expect(filter.matches(2)).toBe(true)
      expect(filter.matches(3)).toBe(false)
      expect(filter.matches(4)).toBe(true)
      expect(filter.matches(5)).toBe(true)
      expect(filter.matches(6)).toBe(false)
    })
  })
})
