import IntegerFilter from '../../../src/integer/IntegerFilter'

describe('IntegerFilter', () => {
  test('empty call', () => {
    const filter = new IntegerFilter()

    expect(filter.numFilters).toBe(0)
    expect(filter.matches(0)).toBe(false)
  })

  describe('basics', () => {
    test('single number', () => {
      const filter = new IntegerFilter(1)

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(1)).toBe(true)
      expect(filter.matches(0)).toBe(false)
      expect(filter.matches(2)).toBe(false)
    })

    test('single number as a string', () => {
      const filter = new IntegerFilter('10')

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(10)).toBe(true)
      expect(filter.matches(9)).toBe(false)
      expect(filter.matches(11)).toBe(false)
    })

    describe('arrays', () => {
      test('empty array', () => {
        const filter = new IntegerFilter([])

        expect(filter.numFilters).toBe(0)
        expect(filter.matches(0)).toBe(false)
      })

      test('array of numbers', () => {
        const filter = new IntegerFilter([1, 2, 3])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(0)).toBe(false)
        expect(filter.matches(1)).toBe(true)
        expect(filter.matches(2)).toBe(true)
        expect(filter.matches(3)).toBe(true)
        expect(filter.matches(4)).toBe(false)
      })

      test('array of numbers', () => {
        const filter = new IntegerFilter(['10', '20', '30'])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(9)).toBe(false)
        expect(filter.matches(10)).toBe(true)
        expect(filter.matches(20)).toBe(true)
        expect(filter.matches(30)).toBe(true)
        expect(filter.matches(11)).toBe(false)
      })

      test('array of numbers and strings', () => {
        const filter = new IntegerFilter([1, '2', 3])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(0)).toBe(false)
        expect(filter.matches(1)).toBe(true)
        expect(filter.matches(2)).toBe(true)
        expect(filter.matches(3)).toBe(true)
        expect(filter.matches(4)).toBe(false)
      })
    })
  })
})
