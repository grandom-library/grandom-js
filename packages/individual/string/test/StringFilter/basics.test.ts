import StringFilter from '../../src/StringFilter'

describe('StringFilter', () => {
  test('call without arguments', () => {
    const filter = new StringFilter()

    expect(filter.numFilters).toBe(0)
    expect(filter.matches('a')).toBe(false)
  })
})
