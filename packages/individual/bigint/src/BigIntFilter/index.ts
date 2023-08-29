// TODO: implement edge cases
// TODO: implement detailed error handling

export type Filter = number | bigint | string | Array<number | bigint | string>

interface FilterEntry {
  bigint?: bigint
  range?: [bigint, bigint]
}

const _bigintRangePattern = /^\s*((?:[-+]?)\d+)n?\s*-\s*((?:[-+]?)\d+)n?\s*$/

export default class BigIntFilter {
  private readonly _filterEntries: FilterEntry[] = []

  constructor (filter?: Filter) {
    if (Array.isArray(filter)) {
      for (const f of filter) {
        if (typeof f === 'number' || typeof f === 'bigint') {
          this._parseNumber(f)
        } else if (typeof f === 'string') {
          this._parseString(f)
        }
      }
    } else if (typeof filter === 'number' || typeof filter === 'bigint') {
      this._parseNumber(filter)
    } else if (typeof filter === 'string') {
      this._parseString(filter)
    }
  }

  get numFilters (): number {
    return this._filterEntries.length
  }

  matches (value: bigint): boolean {
    for (const entry of this._filterEntries) {
      if (entry.bigint === value) {
        return true
      } else if ('range' in entry) {
        // @ts-expect-error
        if (value >= entry.range[0] && value <= entry.range[1]) {
          return true
        }
      }
    }

    return false
  }

  private _parseNumber (value: number | bigint): void {
    // let num = Math.floor(value)

    // // NaN check
    // if (num !== num) {
    //   throw new Error(`Filter value cannot be NaN (${value}).`)
    // }

    // if (num === -Infinity) {
    //   throw new Error(`Filter value cannot be -Infinity (${value}).`)
    // }

    // if (num === Infinity) {
    //   throw new Error(`Filter value cannot be Infinity (${value}).`)
    // }

    this._filterEntries.push({ bigint: BigInt(value) })
  }

  private _parseString (value: string): void {
    if (_bigintRangePattern.test(value)) {
      this._parseRange(value)
    } else {
      if (value.endsWith('n')) {
        value = value.substring(0, value.length - 1)
      }

      this._parseNumber(BigInt(value))
    }
  }

  private _parseRange (value: string): void {
    const result = _bigintRangePattern.exec(value)

    if (result !== null) {
      const [, start, stop] = result

      let startNum = this._parseBigIntInString(start)
      let stopNum = this._parseBigIntInString(stop)

      if (startNum > stopNum) {
        const temp = stopNum

        stopNum = startNum
        startNum = temp
      }

      this._filterEntries.push({ range: [startNum, stopNum] })
    }
  }

  private _parseBigIntInString (value: string): bigint {
    // const num = parseInt(value, 10)

    // // NaN check
    // if (num !== num) {
    //   throw new Error(`Value cannot be NaN (${value}).`)
    // }

    // return num

    return BigInt(value)
  }
}
