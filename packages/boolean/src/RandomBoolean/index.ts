import { RandomEngine } from '@grandom/core'

export default class RandomBoolean {
  private _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine
  }

  /**
   * A1
   */
  boolean (): boolean

  /**
   * B1
   */
  boolean (bias: number): boolean

  boolean (arg1?: any): boolean {
    if (typeof arg1 !== 'undefined') {
      if (typeof arg1 !== 'number') {
        throw new TypeError(`bias must be a number, got: ${typeof arg1}.`)
      }

      // NaN guard
      if (arg1 === arg1) {
        if (arg1 < 0) {
          arg1 = 0
        } else if (arg1 > 1) {
          arg1 = 1
        }

        // return this._engine.nextDouble() < arg1
        return this._engine.nextFloat() < arg1
      }
    }

    return this._engine.nextBoolean()
  }
}
