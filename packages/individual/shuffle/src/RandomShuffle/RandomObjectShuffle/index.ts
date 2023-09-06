import { RandomGenerator, RandomEngine } from '@grandom/core'

import { getRest } from '../utils'
// import ExcludeFilter from './ExcludeFilter'

export interface ShuffleObjectOptions<T = any> {
  /**
   * Filters the input object by entry.
   *
   * @param entry The specific entry to filter from the input object.
   * @returns Whether to keep the specific entry in the shuffle pool.
   */
  filter?: (key: keyof T, value: T[keyof T]) => boolean

  /**
   * Exclude one or multiple elements from the input array.
   */
  exclude?: T
}

export default class RandomObjectShuffle extends RandomGenerator {
  constructor (engine: RandomEngine) {
    super(engine)

    this.shuffle = this.shuffle.bind(this)
  }

  // -----------------------------------------------------------------------------------------------

  canBeParsed (arg1: any): boolean {
    return arg1 !== null && typeof arg1 === 'object'
  }

  parse (arg1: any, arg2: any, arg3: any): any {
    const keys = Object.keys(arg1)

    if (keys.length < 1) {
      return {}
    }

    const { count, options } = getRest(arg1, arg2, arg3)

    const filter = typeof options.filter === 'function'
      ? options.filter as ShuffleObjectOptions['filter']
      : undefined

    const length = count === -1
      ? keys.length
      : count

    const pool: Record<string, any> = {}

    this._engine.shuffleArray(keys)

    for (let i = 0; i < length; i++) {
      const key = keys[i]
      const value = arg1[key]

      if (filter?.(key, value) === false) {
        continue
      }

      pool[key] = value
    }

    return pool
  }

  // -----------------------------------------------------------------------------------------------

  /**
   * Shuffles (mixes) the input object entries randomly and returns them
   * as a new object (the input object is not modified).
   *
   * @param object The object to use to shuffle.
   */
  shuffle <T extends Record<string, any>> (object: T): T

  /**
   * Shuffles (mixes) the input object entries randomly and returns them
   * as a new object (the input object is not modified).
   *
   * @param object The object to use to shuffle.
   * @param count The count (length) of the returned object.
   */
  shuffle <T extends Record<string, any>> (
    object: T,
    count: number
  ): T

  /**
   * Shuffles (mixes) the input object entries randomly and returns them
   * as a new object (the input object is not modified).
   *
   * @param object The object to use to shuffle.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle <T extends Record<string, any>> (
    object: T,
    options: ShuffleObjectOptions<T>
  ): T

  /**
   * Shuffles (mixes) the input object entries randomly and returns them
   * as a new object (the input object is not modified).
   *
   * @param object The object to use to shuffle.
   * @param count The count (length) of the returned object.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle <T extends Record<string, any>> (
    object: T,
    count: number,
    options: ShuffleObjectOptions<T>
  ): T

  // -----------------------------------------------------------------------------------------------

  shuffle (arg1: any, arg2?: any, arg3?: any): any {
    if (this.canBeParsed(arg1)) {
      return this.parse(arg1, arg2, arg3)
    }

    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with an object, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }
}
