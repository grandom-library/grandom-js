import { RandomGenerator } from '@grandom/core'

export default class RandomWeighted extends RandomGenerator {
  /**
   * Returns a value according the weights.
   *
   * @param weightsWithValues An array of weight-value pairs.
   */
  weighted <T extends Array<[number, any]>> (weightsWithValues: T): T[number][1]

  /**
   * Returns a value according the weights.
   *
   * @param values An array of values.
   * @param weights An array of weights.
   */
  weighted <T> (values: T[], weights: number[]): T

  weighted (arg1: any, arg2?: any): any {
    if (typeof arg1 !== 'undefined') {
      const weights: number[] = []
      const elements: any[] = []

      // process weightsWithValues -----------------------------------------------------------------
      if (typeof arg2 === 'undefined') {
        if (!Array.isArray(arg1)) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          throw new Error(`weightsWithValues must be an array, got: ${arg1} (typeof === '${typeof arg1}').`)
        }

        if (arg1.length < 1) {
          return
        }

        for (const weightWithValue of arg1) {
          const weight = weightWithValue[0]

          if (!(1 in weightWithValue)) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`value doesn't exist in ${weightWithValue}`)
          }

          const value = weightWithValue[1]

          weights.push(weight)
          elements.push(value)
        }

        return this._engine.nextWeighted(elements, weights)

      // process values, and weights ---------------------------------------------------------------
      } else {
        if (arg1.length < 1) {
          return
        }

        for (let i = 0; i < arg1.length; i++) {
          const value = arg1[i]
          const weight = arg2[i]

          weights.push(weight)
          elements.push(value)
        }

        return this._engine.nextWeighted(elements, weights)
      }
    }
  }
}
