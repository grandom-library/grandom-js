// TODO: handle typed arrays

import { RandomGenerator } from '@grandom/core'
import StringExcludeFilter, { type StringExcludeFilterType } from '../StringExcludeFilter'

type ShuffleStringFilter = (character: string) => boolean
type ShuffleArrayFilter<T> = (item: T) => boolean

export interface ShuffleStringOptions {
  excludeCharacter?: StringExcludeFilterType
  filterCharacter?: ShuffleStringFilter
}

export interface ShuffleArrayOptions<T> {
  excludeItem?: T
  filterItem?: ShuffleArrayFilter<T>
}

export interface ShuffleObjectOptions<T> {
  exclude?: any
  filter?: (key: keyof T, value: T[keyof T]) => boolean
}

export default class RandomShuffle extends RandomGenerator {
  shuffle (string: string): string
  shuffle (string: string, options: ShuffleStringOptions): string

  shuffle <T extends ArrayLike<T>> (array: T): T
  shuffle <T extends ArrayLike<T>> (array: T, options: ShuffleArrayOptions<T>): T

  shuffle <T extends Record<string, any>> (object: T): T
  shuffle <T extends Record<string, any>> (object: T, options: ShuffleObjectOptions<T>): T

  shuffle (arg1: any, arg2?: any): any {
    if (typeof arg1 !== 'undefined') {
      let options: undefined | Record<string, any>

      // process options ---------------------------------------------------------------------------
      if (typeof arg2 === 'object' && arg2 !== null) {
        options = arg2
      }

      // process strings ---------------------------------------------------------------------------
      if (typeof arg1 === 'string') {
        if (arg1.length < 1) {
          return ''
        }

        let excludeCharacter: undefined | StringExcludeFilter
        let filterCharacter: undefined | ShuffleStringFilter

        if (typeof options !== 'undefined') {
          if ('excludeCharacter' in options) {
            excludeCharacter = new StringExcludeFilter(options.excludeCharacter)
          }

          if ('filterCharacter' in options) {
            filterCharacter = options.filterCharacter

            if (typeof filterCharacter !== 'function') {
              throw new Error(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `filterCharacter must be a function, got: ${filterCharacter} (typeof === '${typeof filterCharacter}').`
              )
            }
          }
        }

        const characters: string[] = []

        for (const character of [...arg1]) {
          if (excludeCharacter?.matches(character) === true) {
            continue
          }

          if (filterCharacter?.(character) === false) {
            continue
          }

          characters.push(character)
        }

        this._engine.shuffleArray(characters)

        return characters.join('')
      }

      // process arrays ----------------------------------------------------------------------------
      if (Array.isArray(arg1)) {
        if (arg1.length < 1) {
          return []
        }

        const array: any[] = []

        for (const item of arg1) {
          array.push(item)
        }

        this._engine.shuffleArray(array)

        return array
      }

      // process objects ---------------------------------------------------------------------------
      if (arg1 !== null && typeof arg1 === 'object') {
        const keys = Object.keys(arg1)

        if (keys.length < 1) {
          return {}
        }

        this._engine.shuffleArray(keys)

        const object: Record<string, any> = {}

        for (const key of keys) {
          object[key] = arg1[key]
        }

        return object
      }
    }

    // type guard ----------------------------------------------------------------------------------
    throw new TypeError(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Must be called with a string, array, or object, got: ${arg1} (typeof === '${typeof arg1}').`
    )
  }
}
