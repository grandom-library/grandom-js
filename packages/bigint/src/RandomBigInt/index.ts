// TODO: implement edge cases (including infinite loops)
// TODO: implement detailed error handling

import { RandomEngine } from '@grandom/core'

import BigIntFilter, { type Filter } from '../BigIntFilter'

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

type BigIntOptions = {
  minimum?: number | bigint
  maximum?: number | bigint
} & ConfigOptions

export default class RandomBigInt {
  private _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine
  }

  bigint (): bigint

  bigint (maximum: number | bigint): bigint

  // TODO: test with number/bigint + options
  bigint (maximum: number | bigint, options: ConfigOptions): bigint

  bigint (minimum: number | bigint, maximum: number | bigint): bigint

  bigint (minimum: number | bigint, maximum: number | bigint, options: ConfigOptions): bigint

  // TODO: test
  bigint (options: BigIntOptions): bigint

  bigint (arg1?: any, arg2?: any, arg3?: any): bigint {
    if (typeof arg1 !== 'undefined') {
      let min = RandomEngine.DEFAULT_BIGINT_MINIMUM
      let max = RandomEngine.DEFAULT_BIGINT_MAXIMUM

      let includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM
      let includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM

      let hasFilter = false
      // let includeFilter: undefined | IntegerFilter
      let excludeFilter: undefined | BigIntFilter

      if (typeof arg1 === 'bigint') {

        if (typeof arg2 === 'undefined') {
          max = arg1
        }

        if (typeof arg2 === 'bigint') {
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
            excludeFilter = new BigIntFilter(arg3.exclude)
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

          const bigint = this._engine.nextBigInt(min, max, includeMin, includeMax)

          if (excludeFilter?.matches(bigint)) {
            loop++
            continue
          }

          return bigint
        }
      }

      return this._engine.nextBigInt(min, max, includeMin, includeMax)
    }

    return this._engine.nextBigInt()
  }
}
