interface FilterEntry {
  string?: string
  regexp?: RegExp
}

export default class ExcludeFilter {
  private readonly _filterEntries: FilterEntry[] = []

  constructor (exclude: string | RegExp | Array<string | RegExp>) {
    if ((typeof exclude !== 'string' && typeof exclude !== 'object') || exclude === null) {
      throw new TypeError(
        'Filter must be a string, RegExp, or Array<string | RegExp>, got: ' +
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${exclude} (typeof === '${typeof exclude}').`
      )
    }

    const filters = Array.isArray(exclude)
      ? exclude
      : [exclude]

    let i = 0

    for (const filter of filters) {
      if (typeof filter === 'string') {
        this._filterEntries.push({ string: filter })
      } else if (filter instanceof RegExp) {
        this._filterEntries.push({ regexp: filter })
      } else {
        throw new TypeError(
          `Filter[${i}] must be a string, or a RegExp, got: ` +
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${filter} (typeof === '${typeof filter}').`
        )
      }

      i++
    }
  }

  get numFilters (): number {
    return this._filterEntries.length
  }

  matches (value: string): boolean {
    for (const filterEntry of this._filterEntries) {
      if (value === filterEntry.string) {
        return true
      }

      if (filterEntry.regexp?.test(value) === true) {
        return true
      }
    }

    return false
  }
}
