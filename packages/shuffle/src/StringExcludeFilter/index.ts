// TODO: implement edge cases
// TODO: implement detailed error handling

export type StringExcludeFilterType =
  string
  | string[]
  | RegExp
  | RegExp[]

interface FilterEntry {
  string?: string
  regexp?: RegExp
}

export default class StringExcludeFilter {
  private readonly _filterEntries: FilterEntry[] = []

  constructor (excludeFilter: StringExcludeFilterType) {
    const filters = Array.isArray(excludeFilter)
      ? excludeFilter
      : [excludeFilter]

    for (const filter of filters) {
      if (typeof filter === 'string') {
        this._filterEntries.push({ string: filter })
      } else if (filter instanceof RegExp) {
        this._filterEntries.push({ regexp: filter })
      }
    }
  }

  get numFilters (): number {
    return this._filterEntries.length
  }

  matches (value: string): boolean {
    for (const filterEntry of this._filterEntries) {
      if ('string' in filterEntry) {
        if (value === filterEntry.string) {
          return true
        }
      }

      if ('regexp' in filterEntry) {
        // @ts-expect-error
        if (filterEntry.regexp.test(value)) {
          return true
        }
      }
    }

    return false
  }
}
