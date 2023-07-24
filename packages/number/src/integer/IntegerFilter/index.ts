// TODO: implement edge cases
// TODO: implement detailed error handling

export type Filter = number | string | Array<number | string>

type FilterEntry = {
  number?: number
  range?: [number, number]
}

const _integerRangePattern = /^\s*((?:[-+]?)\d+)\s*-\s*((?:[-+]?)\d+)\s*$/

export default class IntegerFilter {
  private _filterEntries: FilterEntry[] = []

  constructor (filter?: Filter) {
    if (Array.isArray(filter)) {
      for (const f of filter) {
        if (typeof f === 'number') {
          this._parseNumber(f)
        } else if (typeof f === 'string') {
          this._parseString(f)
        }
      }

    } else if (typeof filter === 'number') {
      this._parseNumber(filter)
    } else if (typeof filter === 'string') {
      this._parseString(filter)
    }
  }

  get numFilters (): number {
    return this._filterEntries.length
  }

  matches (value: number): boolean {
    for (const entry of this._filterEntries) {
      if (entry.number === value) {
        return true
      } else if ('range' in entry) {
        // @ts-ignore
        if (value >= entry.range[0] && value <= entry.range[1]) {
          return true
        }
      }
    }

    return false
  }

  private _parseNumber (value: number) {
    let num = Math.floor(value)

    // NaN check
    if (num !== num) {
      throw new Error(`Filter value cannot be NaN (${value}).`)
    }

    if (num === -Infinity) {
      throw new Error(`Filter value cannot be -Infinity (${value}).`)
    }

    if (num === Infinity) {
      throw new Error(`Filter value cannot be Infinity (${value}).`)
    }

    this._filterEntries.push({ number: value })
  }

  private _parseString (value: string) {
    if (_integerRangePattern.test(value)) {
      this._parseRange(value)
    } else {
      this._parseNumber(parseInt(value, 10))
    }
  }

  private _parseRange (value: string) {
    const [, start, stop, ] = _integerRangePattern.exec(value)!

    let startNum = this._parseNumberInString(start)
    let stopNum = this._parseNumberInString(stop)

    if (startNum > stopNum) {
      const temp = stopNum

      stopNum = startNum
      startNum = temp
    }

    this._filterEntries.push({ range: [startNum, stopNum] })
  }

  private _parseNumberInString (value: string): number {
    const num = parseInt(value, 10)

    // NaN check
    if (num !== num) {
      throw new Error(`Value cannot be NaN (${value}).`)
    }

    return num
  }
}
