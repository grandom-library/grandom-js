// TODO: implement edge cases (including infinite loops)
// TODO: implement detailed error handling

import { RandomEngine } from '@grandom/core'

import IntegerFilter, { type Filter } from '../IntegerFilter'

const DEFAULT_LOOP_GUARD = 1_000_000

type ConfigOptions = {
  includeMinimum?: boolean
  includeMaximum?: boolean

  exclude?: Filter

  // include?: {
  //   minimum?: boolean
  //   maximum?: boolean
  // }

  // unique?: boolean
  // filter?: Filter
  // loopLimit?: boolean | number
}

type IntegerOptions = {
  minimum?: number
  maximum?: number
} & ConfigOptions

export default class RandomInteger {
  private _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine
  }

  integer (): number

  integer (maximum: number): number

  // TODO: test
  integer (maximum: number, options: ConfigOptions): number

  integer (minimum: number, maximum: number): number

  integer (minimum: number, maximum: number, options: ConfigOptions): number

  // TODO: test
  integer (options: IntegerOptions): number

  integer (arg1?: any, arg2?: any, arg3?: any): number {
    if (typeof arg1 !== 'undefined') {
      let min = 0
      let max = Number.MAX_SAFE_INTEGER

      let includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM
      let includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM

      let hasFilter = false
      // let includeFilter: undefined | IntegerFilter
      let excludeFilter: undefined | IntegerFilter

      if (typeof arg1 === 'number') {

        if (typeof arg2 === 'undefined') {
          max = arg1
        }

        if (typeof arg2 === 'number') {
          min = arg1
          max = arg2
        }

        if (typeof arg3 === 'object' && arg3 !== null) {
          if (typeof arg3.includeMinimum === 'boolean') {
            includeMin = arg3.includeMinimum
          }

          if (typeof arg3.includeMaximum === 'boolean') {
            includeMax = arg3.includeMaximum
          }

          // if ('include' in arg3) {
          //   includeFilter = new IntegerFilter(arg3.include)
          //   hasFilter = true
          // }

          if ('exclude' in arg3) {
            excludeFilter = new IntegerFilter(arg3.exclude)
            hasFilter = true
          }
        }
      }

      if (hasFilter) {
        let loopGuard = DEFAULT_LOOP_GUARD
        let loop = 0

        while (true) {
          if (loop >= loopGuard) {
            throw new Error(`Infinite loop guard reached after ${loopGuard} iterations.`)
          }

          const int = this._engine.nextInteger(min, max, includeMin, includeMax)

          if (excludeFilter?.matches(int)) {
            loop++
            continue
          }

          return int
        }
      }

      return this._engine.nextInteger(min, max, includeMin, includeMax)
    }

    return this._engine.nextInteger()
  }
}
