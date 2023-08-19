import { RandomGenerator } from '@grandom/core'

export default class RandomBoolean extends RandomGenerator {
  /**
   * Generates a random boolean value.
   */
  boolean (): boolean

  /**
   * Generates a random, **biased** boolean value.
   *
   * If the bias <= 0, then it will always return false.
   * If the bias >= 1, then it will always return true.
   *
   * A bias of **0.5** means it will return true / false ***roughly 50%*** of the time.
   *
   * @param bias The bias to generate the random value **within the range [0,1]**.
   */
  boolean (bias: number): boolean

  boolean (arg1?: any): boolean {
    if (typeof arg1 !== 'undefined') {
      if (typeof arg1 !== 'number') {
        throw new TypeError(`bias must be a number, got: ${typeof arg1}.`)
      }

      // NaN guard
      // eslint-disable-next-line no-self-compare
      if (arg1 === arg1) {
        if (arg1 < 0) {
          arg1 = 0
        } else if (arg1 > 1) {
          arg1 = 1
        }

        return this._engine.nextFloat() < arg1
      }
    }

    return this._engine.nextBoolean()
  }
}
