import ExcludeFilter from '../../../../src/RandomShuffle/RandomStringShuffle/ExcludeFilter'

describe('RandomStringShuffle', () => {
  describe('ExcludeFilter', () => {
    describe('strings', () => {
      test('1 string filter', () => {
        const excludeFilter = new ExcludeFilter('a')

        expect(excludeFilter.numFilters).toBe(1)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(false)
      })

      test('2 string filters', () => {
        const excludeFilter = new ExcludeFilter(['a', 'b'])

        expect(excludeFilter.numFilters).toBe(2)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(true)
        expect(excludeFilter.matches('c')).toBe(false)
      })

      test('3 string filters', () => {
        const excludeFilter = new ExcludeFilter(['a', 'b', 'c'])

        expect(excludeFilter.numFilters).toBe(3)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(true)
        expect(excludeFilter.matches('c')).toBe(true)
      })
    })

    describe('RegExps', () => {
      test('1 RegExp filter', () => {
        const excludeFilter = new ExcludeFilter(/a/)

        expect(excludeFilter.numFilters).toBe(1)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(false)
      })

      test('2 RegExp filters', () => {
        const excludeFilter = new ExcludeFilter([/a/, /c/])

        expect(excludeFilter.numFilters).toBe(2)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(true)
      })

      test('3 RegExp filters', () => {
        const excludeFilter = new ExcludeFilter([/a/, /b/, /c/])

        expect(excludeFilter.numFilters).toBe(3)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(true)
        expect(excludeFilter.matches('c')).toBe(true)
      })
    })

    describe('array of strings and RegExps', () => {
      test('empty array ([])', () => {
        const excludeFilter = new ExcludeFilter([])

        expect(excludeFilter.numFilters).toBe(0)
        expect(excludeFilter.matches('a')).toBe(false)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(false)
      })

      test('1 string in array ([\'a\'])', () => {
        const excludeFilter = new ExcludeFilter(['c'])

        expect(excludeFilter.numFilters).toBe(1)
        expect(excludeFilter.matches('a')).toBe(false)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(true)
      })

      test('1 RegExp in array ([/b/])', () => {
        const excludeFilter = new ExcludeFilter([/b/])

        expect(excludeFilter.numFilters).toBe(1)
        expect(excludeFilter.matches('a')).toBe(false)
        expect(excludeFilter.matches('b')).toBe(true)
        expect(excludeFilter.matches('c')).toBe(false)
      })

      test('1 string and 1 RegExp in array([\'a\', /c/])', () => {
        const excludeFilter = new ExcludeFilter(['a', /c/])

        expect(excludeFilter.numFilters).toBe(2)
        expect(excludeFilter.matches('a')).toBe(true)
        expect(excludeFilter.matches('b')).toBe(false)
        expect(excludeFilter.matches('c')).toBe(true)
      })
    })

    describe('errors', () => {
      test('no arguments', () => {
        // @ts-expect-error
        expect(() => new ExcludeFilter()).toThrowWithMessage(
          TypeError,
          'Filter must be a string, RegExp, or Array<string | RegExp>, ' +
          'got: undefined (typeof === \'undefined\').'
        )
      })

      test('wrong type (null)', () => {
        // @ts-expect-error
        expect(() => new ExcludeFilter(null)).toThrowWithMessage(
          TypeError,
          'Filter must be a string, RegExp, or Array<string | RegExp>, ' +
          'got: null (typeof === \'object\').'
        )
      })

      test('wrong type (number)', () => {
        // @ts-expect-error
        expect(() => new ExcludeFilter(1)).toThrowWithMessage(
          TypeError,
          'Filter must be a string, RegExp, or Array<string | RegExp>, ' +
          'got: 1 (typeof === \'number\').'
        )
      })

      test('wrong type in array ([\'a\', null])', () => {
        // @ts-expect-error
        expect(() => new ExcludeFilter(['a', null])).toThrowWithMessage(
          TypeError,
          'Filter[1] must be a string, or a RegExp, ' +
          'got: null (typeof === \'object\').'
        )
      })
    })
  })
})
