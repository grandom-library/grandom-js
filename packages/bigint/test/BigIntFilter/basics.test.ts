import BigIntFilter from '../../src/BigIntFilter'

describe('BigIntFilter', () => {
  test('empty call', () => {
    const filter = new BigIntFilter()

    expect(filter.numFilters).toBe(0)
    expect(filter.matches(0n)).toBe(false)
  })

  describe('basics', () => {
    test('single number', () => {
      const filter = new BigIntFilter(1n)

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(1n)).toBe(true)
      expect(filter.matches(0n)).toBe(false)
      expect(filter.matches(2n)).toBe(false)
    })

    test('single number as a string', () => {
      const filter = new BigIntFilter('10')

      expect(filter.numFilters).toBe(1)

      expect(filter.matches(10n)).toBe(true)
      expect(filter.matches(9n)).toBe(false)
      expect(filter.matches(11n)).toBe(false)
    })

    describe('arrays', () => {
      test('empty array', () => {
        const filter = new BigIntFilter([])

        expect(filter.numFilters).toBe(0)
        expect(filter.matches(0n)).toBe(false)
      })

      test('array of numbers', () => {
        const filter = new BigIntFilter([1n, 2, 3n])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(0n)).toBe(false)
        expect(filter.matches(1n)).toBe(true)
        expect(filter.matches(2n)).toBe(true)
        expect(filter.matches(3n)).toBe(true)
        expect(filter.matches(4n)).toBe(false)
      })

      test('array of numbers', () => {
        const filter = new BigIntFilter(['10n', '20', '30n'])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(9n)).toBe(false)
        expect(filter.matches(10n)).toBe(true)
        expect(filter.matches(20n)).toBe(true)
        expect(filter.matches(30n)).toBe(true)
        expect(filter.matches(11n)).toBe(false)
      })

      test('array of numbers and strings', () => {
        const filter = new BigIntFilter([1n, '2n', 3n])

        expect(filter.numFilters).toBe(3)

        expect(filter.matches(0n)).toBe(false)
        expect(filter.matches(1n)).toBe(true)
        expect(filter.matches(2n)).toBe(true)
        expect(filter.matches(3n)).toBe(true)
        expect(filter.matches(4n)).toBe(false)
      })
    })
  })
})
