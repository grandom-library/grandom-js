
// TODO: include / exclude / filter function
// TODO: implement edge cases (including infinite loops)

import { RandomEngine } from '@grandom/core'

const DEFAULT_FALLBACK = undefined

// interface ConfigOptions {
//   includeMinimum?: boolean
//   includeMaximum?: boolean

//   // include?: {
//   //   minimum?: boolean
//   //   maximum?: boolean
//   // }

//   // unique?: boolean
//   // filter?: Filter
//   // loopLimit?: boolean | number
// }

// type PickOptions<T> = {
//   default?: T
//   count?: number
// } & ConfigOptions

export interface PickStringOptions<T> {
  default?: T
  count?: number
}

export interface PickArrayOptions<T> {
  default?: T
}

export interface PickObjectOptions<T> {
  default?: T
}

/*
grandom.pick([1, 2, 3], { default: -1 })

grandom.pick.multiple([1, 2, 3], { count: 2, default: -1 })

const unique = grandom.pick.unique([1, 2, 3], { default: -1 })
const unique = grandom.pick.unique.multiple([1, 2, 3], { count: 2, default: -1 })
const unique = grandom.pick.multiple.unique([1, 2, 3], { count: 2, default: -1 })
*/

// interface Pick {
//   // strings ---------------------------------------------------------------------------------------
//   (string: string): string
//   <T = undefined> (string: string, options: PickStringOptions<T>): string | T

//   // arrays ----------------------------------------------------------------------------------------
//   <T> (array: ArrayLike<T>): T
//   <T, U = undefined> (array: ArrayLike<T>, options: PickArrayOptions<U>): T | U

//   multiple: {
//     // strings -------------------------------------------------------------------------------------
//     (string: string, count: number): string
//     <T = undefined> (string: string, options: PickStringOptions<T>): string | T

//     // unique: {
//     //   // strings -----------------------------------------------------------------------------------
//     //   (string: string, count: number): () => string
//     //   <T = undefined> (string: string, options: PickStringOptions<T>): () => string | T
//     // }
//   }

//   unique: {
//     // strings -------------------------------------------------------------------------------------
//     (string: string): () => string
//     <T = undefined> (string: string, options: PickStringOptions<T>): () => string | T

//     multiple: {
//       // strings -----------------------------------------------------------------------------------
//       (string: string, count: number): () => string
//       <T = undefined> (string: string, options: PickStringOptions<T>): () => string | T
//     }
//   }
// }

export default class RandomPick {
  private readonly _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine

    // const pick: Pick = (arg1: any, arg2?: any): any => {}
    // pick.multiple = (arg1: any, arg2: any): any => {}
    // // pick.multiple.unique = (arg1: any, arg2?: any): any => { return () => null }
    // pick.unique = (arg1: any, arg2?: any) => { return (): any => null }
    // pick.unique.multiple = (arg1: any, arg2: any) => { return (): any => null }

    // this.pick = pick
  }

  // pick: Pick

  pick (string: string): string
  pick <T = undefined> (string: string, options: PickStringOptions<T>): string | T

  pick <T> (array: ArrayLike<T>): T
  pick <T, U = undefined> (array: ArrayLike<T>, options: PickArrayOptions<U>): T | U

  pick <T extends Record<string, any>> (object: T): [keyof T, T[keyof T]]
  pick <T extends Record<string, any>, U = undefined> (object: T, options: PickObjectOptions<U>): [keyof T, T[keyof T]] | U

  pick (arg1: any, arg2?: any): any {
    if (typeof arg1 !== 'undefined') {
      let fallback: any = DEFAULT_FALLBACK

      // process strings ---------------------------------------------------------------------------
      if (typeof arg1 === 'string') {
        let count = 1

        // process string options ------------------------------------------------------------------
        if (typeof arg2 !== 'undefined') {
          // process count option ------------------------------------------------------------------
          if ('count' in arg2) {
            if (typeof arg2.count === 'number') {
              count = arg2.count

              // NaN check and bound checks
              // eslint-disable-next-line no-self-compare
              if (count !== count || count < 1 || count > Number.MAX_SAFE_INTEGER) {
                throw new RangeError(
                  `Count must be 1 >= count <= Number.MAX_SAFE_INTEGER, got: ${count}.`
                )
              }
            } else {
              throw new TypeError(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `Count must be a number, got: ${arg2.count} (typeof === '${typeof arg2.count}').`
              )
            }
          }

          // process fallback (default) option -----------------------------------------------------
          if ('default' in arg2) {
            fallback = arg2.default
          }
        }

        // return the fallback (default) if the string is empty (e.g.: '')
        if (arg1.length === 0) {
          return fallback
        }

        if (count === 1) {
          return this._engine.pickArray(arg1)
        } else {
          let string = ''

          for (let i = 0; i < count; i++) {
            string += this._engine.pickArray(arg1)
          }

          return string
        }

      // process arrays ----------------------------------------------------------------------------
      } else if (Array.isArray(arg1)) {
        // return the fallback (default) if the array is empty (e.g.: [])
        if (arg1.length === 0) {
          // process string options ----------------------------------------------------------------
          if (typeof arg2 !== 'undefined') {
            // process fallback (default) option ---------------------------------------------------
            if ('default' in arg2) {
              fallback = arg2.default
            }
          }

          return fallback
        }

        return this._engine.pickArray(arg1)

      // process objects ---------------------------------------------------------------------------
      } else if (typeof arg1 === 'object' && arg1 !== null) {
        const keys = Object.keys(arg1)

        // return the fallback (default) if the array is empty (e.g.: {})
        if (keys.length === 0) {
          // process string options ----------------------------------------------------------------
          if (typeof arg2 !== 'undefined') {
            // process fallback (default) option ---------------------------------------------------
            if ('default' in arg2) {
              fallback = arg2.default
            }
          }

          return fallback
        }

        const key = this._engine.pickArray(keys)

        return [key, arg1[key]]
      }
    }

    // type guard ----------------------------------------------------------------------------------
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with a string, array, or object, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }

  // pickUnique (arg1: any, arg2?: any): any {}
  // pickMultiple (arg1: any, arg2?: any): any {}
  // pickMultipleUnique (arg1: any, arg2?: any): any {}
}

// const r = new RandomPick()
// const result = r.pick({ a: 1, b: '2', c: false }, { default: null })
// const [key, value] = r.pick({ a: 1, b: '2', c: false }, { default: [false, null] })
