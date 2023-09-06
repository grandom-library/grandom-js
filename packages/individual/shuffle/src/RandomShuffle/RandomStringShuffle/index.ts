import { RandomGenerator, RandomEngine } from '@grandom/core'

import { getRest } from '../utils'
import ExcludeFilter from './ExcludeFilter'

export interface ShuffleStringOptions {
  /**
   * Filters the input string by character.
   *
   * @param character The specific character to filter from the input string.
   * @returns Whether to keep the specific character in the shuffle pool.
   */
  filter?: (character: string) => boolean

  /**
   * Exclude one or multiple characters from the input string.
   */
  exclude?: string | RegExp | Array<string | RegExp>
}

export default class RandomStringShuffle extends RandomGenerator {
  constructor (engine: RandomEngine) {
    super(engine)

    this.shuffle = this.shuffle.bind(this)
  }

  // -----------------------------------------------------------------------------------------------

  canBeParsed (arg1: any): boolean {
    return typeof arg1 === 'string'
  }

  parse (arg1: any, arg2: any, arg3: any): any {
    if (arg1.length < 1) {
      return ''
    }

    const { count, options } = getRest(arg1, arg2, arg3)

    // -------------------------------------------------------------------------

    const exclude = 'exclude' in options
      ? new ExcludeFilter(options.exclude)
      : undefined

    const filter = typeof options.filter === 'function'
      ? options.filter as ShuffleStringOptions['filter']
      : undefined

    // -------------------------------------------------------------------------

    const characters = [...arg1]
    const pool: string[] = []

    let length = count === -1
      ? characters.length
      : count

    // clamp length, disallow larger count, than the input string
    if (length > characters.length) {
      length = characters.length
    }

    // preshuffle, to allow all characters to be picked from, if count
    // is smaller, than the input string length
    this._engine.shuffleArray(characters)

    for (let i = 0; i < length; i++) {
      const character = characters[i]

      if (exclude?.matches(character) === true) {
        continue
      }

      if (filter?.(character) === false) {
        continue
      }

      pool.push(character)
    }

    return pool.join('')
  }

  // -----------------------------------------------------------------------------------------------

  /**
   * Shuffles (mixes) the input string and returns it.
   *
   * @param string The string to shuffle.
   */
  shuffle (string: string): string

  /**
   * Shuffles (mixes) the input string and returns it.
   *
   * @param string The string to shuffle.
   * @param count The count (length) of the returned string.
   */
  shuffle (
    string: string,
    count: number
  ): string

  /**
   * Shuffles (mixes) the input string and returns it.
   *
   * @param string The string to shuffle.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle (
    string: string,
    options: ShuffleStringOptions
  ): string

  /**
   * Shuffles (mixes) the input string and returns it.
   *
   * @param string The string to shuffle.
   * @param count The count (length) of the returned string.
   * @param options Shuffle options (filtering and fallback).
   */
  shuffle (
    string: string,
    count: number,
    options: ShuffleStringOptions
  ): string

  // -----------------------------------------------------------------------------------------------

  shuffle (arg1: any, arg2?: any, arg3?: any): any {
    if (this.canBeParsed(arg1)) {
      return this.parse(arg1, arg2, arg3)
    }

    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with a string, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }
}
