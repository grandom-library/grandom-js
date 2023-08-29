// TODO: implement filtering
// TODO: implement edge cases (including infinite loops)
// TODO: implement detailed error handling

import { RandomGenerator, RandomEngine } from '@grandom/core'

export interface ConfigOptions {
  includeMinimum?: boolean
  includeMaximum?: boolean
}

type FloatOptions = {
  minimum?: number
  maximum?: number
} & ConfigOptions

export default class RandomFloat extends RandomGenerator {
  float (): number

  float (maximum: number): number

  // TODO: test
  float (maximum: number, options: ConfigOptions): number

  float (minimum: number, maximum: number): number

  float (minimum: number, maximum: number, options: ConfigOptions): number

  // TODO: test
  float (options: FloatOptions): number

  float (arg1?: any, arg2?: any, arg3?: any): number {
    if (typeof arg1 !== 'undefined') {
      let min = RandomEngine.DEFAULT_FLOAT_MINIMUM
      let max = RandomEngine.DEFAULT_FLOAT_MAXIMUM

      let includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM
      let includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM

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
        }
      }

      return this._engine.nextFloat(min, max, includeMin, includeMax)
    }

    return this._engine.nextFloat()
  }
}
