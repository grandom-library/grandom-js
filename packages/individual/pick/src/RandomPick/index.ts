// TODO: include / exclude / filter function
// TODO: implement edge cases (including infinite loops)

import { RandomGenerator } from '@grandom/core'

const DEFAULT_FALLBACK = undefined

export interface PickStringOptions<T = undefined> {
  filter?: (character: string) => boolean
  // include?: string | string[]
  // exclude?: string | string[]
  default?: T
}

export interface PickArrayOptions<T = any, D = undefined> {
  filter?: (element: T) => boolean
  // include?: I | I[]
  // exclude?: E | E[]
  default?: D
}

export interface PickObjectOptions<T = any, D = undefined> {
  filter?: (entry: T) => boolean
  // include?: I | I[]
  // exclude?: E | E[]
  default?: D
}

/*
grandom.pick([1, 2, 3], { default: -1 })

grandom.pick.multiple([1, 2, 3], { count: 2, default: -1 })

const unique = grandom.pick.unique([1, 2, 3], { default: -1 })
const unique = grandom.pick.unique.multiple([1, 2, 3], { count: 2, default: -1 })
const unique = grandom.pick.multiple.unique([1, 2, 3], { count: 2, default: -1 })
*/

export default class RandomPick extends RandomGenerator {
  // strings ---------------------------------------------------------------------------------------

  pick (string: string): string

  pick <T = undefined> (
    string: string,
    options: PickStringOptions<T>
  ): string | T

  pick (
    string: string,
    count: number
  ): string

  pick <T = undefined> (
    string: string,
    count: number,
    options: PickStringOptions<T>
  ): string | T

  // arrays ----------------------------------------------------------------------------------------

  pick <T> (array: ArrayLike<T>): T

  pick <T, D = undefined> (
    array: ArrayLike<T>,
    options: PickArrayOptions<T, D>
  ): T | D

  pick <T> (
    array: ArrayLike<T>,
    count: number
  ): T[]

  pick <T, D = undefined> (
    array: ArrayLike<T>,
    count: number,
    options: PickArrayOptions<T, D>
  ): T[] | D

  // objects ---------------------------------------------------------------------------------------

  pick <T extends Record<string, any>> (object: T): [keyof T, T[keyof T]]

  pick <T extends Record<string, any>, D = undefined> (
    object: T,
    options: PickObjectOptions<T, D>
  ): [keyof T, T[keyof T]] | D

  pick <T extends Record<string, any>> (
    object: T,
    count: number
  ): Array<[keyof T, T[keyof T]]>

  pick <T extends Record<string, any>, D = undefined> (
    object: T,
    count: number,
    options: PickObjectOptions<T, D>
  ): Array<[keyof T, T[keyof T]]> | D

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

    // return the fallback (default) if the string is empty ('')
    if (string.length === 0) {
      return 'default' in options
        ? options.default
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

    // return the fallback (default) if the array is empty ([])
    if (array.length === 0) {
      return 'default' in options
        ? options.default
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

    // return the fallback (default) if the keys array is empty (object === {})
    if (keys.length === 0) {
      return 'default' in options
        ? options.default
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

  // pickUnique (arg1: any, arg2?: any): any {}
  // pickMultiple (arg1: any, arg2?: any): any {}
  // pickMultipleUnique (arg1: any, arg2?: any): any {}
}

// const r = new RandomPick()
// const result = r.pick({ a: 1, b: '2', c: false }, { default: null })
// const [key, value] = r.pick({ a: 1, b: '2', c: false }, { default: [false, null] })
