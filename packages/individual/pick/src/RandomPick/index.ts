// TODO: remove istanbul ignore and write tests for it
// TODO: implement unique
// TODO: include / exclude / filter function
// TODO: implement edge cases (including infinite loops)

import { RandomGenerator } from '@grandom/core'

const DEFAULT_FALLBACK = undefined

export interface PickStringOptions<T = undefined> {
  /**
   * Filters the input string by character.
   *
   * @param character The specific character to filter from the input string.
   * @returns Whether to keep the specific character in the pick pool.
   */
  filter?: (character: string) => boolean

  /**
   * The fallback value, when the string is empty, or all characters
   * of the string are filtered out from the pick pool.
   *
   * @default undefined
   */
  fallback?: T
}

export interface PickArrayOptions<T = any, F = undefined> {
  /**
   * Filters the input array by element.
   *
   * @param element The specific element to filter from the input array.
   * @returns Whether to keep the specific element in the pick pool.
   */
  filter?: (element: T) => boolean

  /**
   * The fallback value, when the array is empty, or all elements
   * of the array are filtered out from the pick pool.
   *
   * @default undefined
   */
  fallback?: F
}

export interface PickObjectOptions<T = any, F = undefined> {
  /**
   * Filters the input object by entry.
   *
   * @param entry The specific entry to filter from the input object.
   * @returns Whether to keep the specific entry in the pick pool.
   */
  filter?: (entry: T) => boolean

  /**
   * The fallback value, when the object is empty, or all entries
   * of the object are filtered out from the pick pool.
   *
   * @default undefined
   */
  fallback?: F
}

export default class RandomPick extends RandomGenerator {
  // strings ---------------------------------------------------------------------------------------

  /**
   * Picks a random string (character) from the input string and returns it.
   *
   * @param string The string to pick from.
   */
  pick (string: string): string

  /**
   * Picks a random string (character) from the input string and returns it.
   *
   * @param string The string to pick from.
   * @param options Pick options (filtering and fallback).
   */
  pick <T = undefined> (
    string: string,
    options: PickStringOptions<T>
  ): string | T

  /**
   * Picks one, or multiple random strings (characters)
   * from the input string and returns it.
   *
   * @param string The string to pick from.
   * @param count The count (length) of the returned string.
   */
  pick (
    string: string,
    count: number
  ): string

  /**
   * Picks one, or multiple random strings (characters)
   * from the input string and returns it.
   *
   * @param string The string to pick from.
   * @param count The count (length) of the returned string.
   * @param options Pick options (filtering and fallback).
   */
  pick <T = undefined> (
    string: string,
    count: number,
    options: PickStringOptions<T>
  ): string | T

  // arrays ----------------------------------------------------------------------------------------

  /**
   * Picks a random element from the input array and returns it.
   *
   * @param array The array to pick from.
   */
  pick <T> (array: ArrayLike<T>): T

  /**
   * Picks a random element from the input array and returns it.
   *
   * @param array The array to pick from.
   * @param options Pick options (filtering and fallback).
   */
  pick <T, F = undefined> (
    array: ArrayLike<T>,
    options: PickArrayOptions<T, F>
  ): T | F

  /**
   * Picks one, or multiple random elements from
   * the input array and returns it.
   *
   * @param array The array to pick from.
   * @param count The count (length) of elements of the returned array.
   */
  pick <T> (
    array: ArrayLike<T>,
    count: number
  ): T[]

  /**
   * Picks one, or multiple random elements from
   * the input array and returns it.
   *
   * @param array The array to pick from.
   * @param count The count (length) of elements of the returned array.
   * @param options Pick options (filtering and fallback).
   */
  pick <T, F = undefined> (
    array: ArrayLike<T>,
    count: number,
    options: PickArrayOptions<T, F>
  ): T[] | F

  // objects ---------------------------------------------------------------------------------------

  /**
   * Picks a random entry from the input object and returns it.
   *
   * @param object The object to pick from.
   */
  pick <T extends Record<string, any>> (object: T): [keyof T, T[keyof T]]

  /**
   * Picks a random entry from the input object and returns it.
   *
   * @param object The object to pick from.
   * @param options Pick options (filtering and fallback).
   */
  pick <T extends Record<string, any>, F = undefined> (
    object: T,
    options: PickObjectOptions<T, F>
  ): [keyof T, T[keyof T]] | F

  /**
   * Picks one, or multiple random entries from
   * the input object and returns it.
   *
   * @param object The object to pick from.
   * @param count The count (length) of entries of the returned array.
   */
  pick <T extends Record<string, any>> (
    object: T,
    count: number
  ): Array<[keyof T, T[keyof T]]>

  /**
   * Picks one, or multiple random entries from
   * the input object and returns it.
   *
   * @param object The object to pick from.
   * @param count The count (length) of entries of the returned array.
   * @param options Pick options (filtering and fallback).
   */
  pick <T extends Record<string, any>, F = undefined> (
    object: T,
    count: number,
    options: PickObjectOptions<T, F>
  ): Array<[keyof T, T[keyof T]]> | F

  // -----------------------------------------------------------------------------------------------

  pick (arg1: any, arg2?: any, arg3?: any): any {
    if (typeof arg1 !== 'undefined') {
      let count: any
      let options = {}

      // process count and options
      if (typeof arg2 !== 'undefined') {
        if (typeof arg2 === 'number') {
          count = arg2
        } else if (typeof arg2 === 'object' && arg2 !== null) {
          options = arg2
        } else {
          throw new TypeError(
            '2nd argument must be a number (count), or an object (options), ' +
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `got: ${arg2} (typeof === '${typeof arg2}').`
          )
        }

        if (typeof arg3 !== 'undefined') {
          /* istanbul ignore next */
          if (typeof arg3 === 'object' && arg3 !== null) {
            options = arg3
          } else {
            throw new TypeError(
              '3rd argument must be an object (options), ' +
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `got: ${arg3} (typeof === '${typeof arg3}').`
            )
          }
        }
      }

      // process strings
      if (typeof arg1 === 'string') {
        return this._pickString(arg1, count, options)

      // process arrays
      } else if (Array.isArray(arg1)) {
        return this._pickArray(arg1, count, options)

      // process objects
      } else if (typeof arg1 === 'object' && arg1 !== null) {
        return this._pickObject(arg1, count, options)
      }
    }

    // type guard ----------------------------------------------------------------------------------
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with a string, array, or object, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }

  private _pickString (string: string, count: number, options: PickStringOptions): any {
    if (typeof count !== 'undefined') {
      // NaN check and bound checks
      // eslint-disable-next-line no-self-compare
      if (count !== count || count < 1 || count > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(
          `Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: ${count}.`
        )
      }
    }

    // return the fallback if the string is empty ('')
    if (string.length === 0) {
      return 'fallback' in options
        ? options.fallback
        : DEFAULT_FALLBACK
    }

    if (count > 1) {
      let str = ''

      for (let i = 0; i < count; i++) {
        str += this._engine.pickArray(string)
      }

      return str
    }

    return this._engine.pickArray(string)
  }

  private _pickArray (array: any[], count: number, options: PickArrayOptions): any {
    if (typeof count !== 'undefined') {
      // NaN check and bound checks
      // eslint-disable-next-line no-self-compare
      if (count !== count || count < 1 || count > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(
          `Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: ${count}.`
        )
      }
    }

    // return the fallback if the array is empty ([])
    if (array.length === 0) {
      return 'fallback' in options
        ? options.fallback
        : DEFAULT_FALLBACK
    }

    if (count > 1) {
      const result: any[] = []

      for (let i = 0; i < count; i++) {
        result.push(this._engine.pickArray(array))
      }

      return result
    }

    return this._engine.pickArray(array)
  }

  private _pickObject (object: Record<string, any>, count: number, options: PickObjectOptions): any {
    if (typeof count !== 'undefined') {
      // NaN check and bound checks
      // eslint-disable-next-line no-self-compare
      if (count !== count || count < 1 || count > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(
          `Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: ${count}.`
        )
      }
    }

    const keys = Object.keys(object)

    // return the fallback if the keys array is empty (object === {})
    if (keys.length === 0) {
      return 'fallback' in options
        ? options.fallback
        : DEFAULT_FALLBACK
    }

    if (count > 1) {
      const result: any[] = []

      let key

      for (let i = 0; i < count; i++) {
        key = this._engine.pickArray(keys)
        result.push([key, object[key]])
      }

      return result
    }

    const key = this._engine.pickArray(keys)
    return [key, object[key]]
  }
}
