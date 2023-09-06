// TODO: handle typed arrays

import { RandomGenerator, RandomEngine } from '@grandom/core'

import { getRest } from '../utils'
// import ExcludeFilter from './ExcludeFilter'

export interface ShuffleArrayOptions<T = any> {
  /**
   * Filters the input array by element.
   *
   * @param element The specific element to filter from the input array.
   * @returns Whether to keep the specific element in the shuffle pool.
   */
  filter?: (element: T) => boolean

  /**
   * Exclude one or multiple elements from the input array.
   */
  exclude?: T | T[]
}

export default class RandomArrayShuffle extends RandomGenerator {
  constructor (engine: RandomEngine) {
    super(engine)

    this.shuffle = this.shuffle.bind(this)
  }

  // -----------------------------------------------------------------------------------------------

  canBeParsed (arg1: any): boolean {
    return Array.isArray(arg1)
  }

  parse (arg1: any, arg2: any, arg3: any): any {
    if (arg1.length < 1) {
      return []
    }

    const { count, options } = getRest(arg1, arg2, arg3)

    const filter = typeof options.filter === 'function'
      ? options.filter as ShuffleArrayOptions['filter']
      : undefined

    const length = count === -1
      ? arg1.length
      : count

    const pool: any[] = []

    for (let i = 0; i < length; i++) {
      const element = arg1[i]

      if (filter?.(element) === false) {
        continue
      }

      pool.push(element)
    }

    this._engine.shuffleArray(pool)

    return pool
  }

  // -----------------------------------------------------------------------------------------------

  /**
   * Shuffles (mixes) the input array elements randomly and returns them
   * as a new array (the input array is not modified).
   *
   * @param array The array to use to shuffle.
   */
  shuffle <T> (array: ArrayLike<T>): T

  /**
   * Shuffles (mixes) the input array elements randomly and returns them
   * as a new array (the input array is not modified).
   *
   * @param array The array to use to shuffle.
   * @param count The count (length) of the returned array.
   */
  shuffle <T> (
    array: ArrayLike<T>,
    count: number
  ): T

  /**
   * Shuffles (mixes) the input array elements randomly and returns them
   * as a new array (the input array is not modified).
   *
   * @param array The array to use to shuffle.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle <T> (
    array: ArrayLike<T>,
    options: ShuffleArrayOptions<T>
  ): T

  /**
   * Shuffles (mixes) the input array elements randomly and returns them
   * as a new array (the input array is not modified).
   *
   * @param array The array to use to shuffle.
   * @param count The count (length) of the returned array.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle <T> (
    array: ArrayLike<T>,
    count: number,
    options: ShuffleArrayOptions<T>
  ): T

  // -----------------------------------------------------------------------------------------------

  shuffle (arg1: any, arg2?: any, arg3?: any): any {
    if (this.canBeParsed(arg1)) {
      return this.parse(arg1, arg2, arg3)
    }

    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with an array, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }
}
