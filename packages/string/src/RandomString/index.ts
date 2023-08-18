
// TODO: implement edge cases (including infinite loops)
// TODO: implement detailed error handling

import { RandomEngine } from '@grandom/core'
import { type Filter } from '../StringFilter'

export interface ConfigOptions {
  filter?: {
    include?: Filter
    exclude?: Filter
  }
  bias?: number
}

type RandomStringOptions = {
  length?: number
  | [number, number]
  | {
    minimum?: number
    maximum?: number
  }
} & ConfigOptions

export default class RandomString {
  /**
   * The default length of a random string.
   *
   * @default 16
   */
  static DEFAULT_LENGTH = 16

  /**
   * Numbers set.
   *
   * @default '0123456789'
   */
  static NUMBERS = '0123456789'

  /**
   * Letters set.
   *
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   */
  static LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  /**
   * Letters and numbers.
   *
   * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   */
  static ALPHANUMERIC = RandomString.LETTERS + RandomString.NUMBERS

  // ---------------------------------------------------------------------------

  private readonly _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine
  }

  // ---------------------------------------------------------------------------

  /**
   * Generates a random **16 character long** string consisting
   * of alphanumeric characters **(A-Za-z0-9)**.
   */
  string (): string

  /**
   * Generates a random string consisting
   * of alphanumeric characters **(A-Za-z0-9)**.
   *
   * @param length The length of the randomly generated string.
   */
  string (length: number): string

  /**
   * Generates a random string.
   *
   * @param length The length of the randomly generated string.
   * @param options Random string generation options.
   */
  string (length: number, options: ConfigOptions): string

  /**
   * Generates a random string **between minimum and maximum**.
   *
   * @param minimum The minimum length of the randomly generated string
   *                ***(inclusive)***.
   * @param maximum The maximum length of the randomly generated string
   *                ***(inclusive)***.
   * @param options Random string generation options.
   */
  string (minimum: number, maximum: number, options: ConfigOptions): string

  /**
   * Generates a random string.
   *
   * @param options Random string generation options.
   */
  string (options: RandomStringOptions): string

  // ---------------------------------------------------------------------------

  string (arg1?: any, arg2?: any, arg3?: any): string {
    if (typeof arg1 !== 'undefined') {
      let length = RandomString.DEFAULT_LENGTH

      if (typeof arg1 === 'number') {
        length = arg1
      } else if (typeof arg1 === 'object' && arg1 !== null) {
        if (typeof arg1.length === 'number') {
          length = arg1.length
        }
      } else {
        if (typeof arg1 !== 'number') {
          throw new TypeError(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `length must be a number, got: ${arg1} (typeof === "${typeof arg1}").`
          )
        }
      }

      // NaN check
      // eslint-disable-next-line no-self-compare
      if (length !== length) {
        throw new RangeError(`length must be a non-NaN number, got: ${length}.`)
      } else if (length < 0 || length > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(
          `length must be >= 0 <= 2^53-1 (9,007,199,254,740,991), got ${length}.`
        )
      }

      if (length === 0) {
        return ''
      }

      return this._engine.nextString(
        Math.floor(length),
        RandomString.ALPHANUMERIC
      )
    }

    return this._engine.nextString(
      RandomString.DEFAULT_LENGTH,
      RandomString.ALPHANUMERIC
    )
  }
}
