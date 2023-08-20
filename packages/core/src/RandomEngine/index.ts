/**
 * Core random generator engine class to use to build
 * custom random generator engines.
 */
export default class RandomEngine {
  /**
   * Include minimum during random data generation
   * ***(include by default)***.
   *
   * @default true
   */
  static DEFAULT_INCLUDE_MINIMUM = true

  /**
   * Include maximum during random data generation
   * ***(exclude by default)***.
   *
   * @default false
   */
  static DEFAULT_INCLUDE_MAXIMUM = false

  /**
   * The default minimum for random float generation
   * ***(inclusive by default)***.
   *
   * @default 0
   */
  static DEFAULT_FLOAT_MINIMUM = 0

  /**
   * The default maximum for random float generation
   * ***(exclusive by default)***.
   *
   * @default 1
   */
  static DEFAULT_FLOAT_MAXIMUM = 1

  /**
   * The default minimum for random integer generation
   * ***(inclusive by default)***.
   *
   * @default 0
   */
  static DEFAULT_INTEGER_MINIMUM = 0

  /**
   * The default maximum **(2^32)** for random integer generation
   * ***(exclusive by default)***.
   *
   * @default 4294967296
   */
  static DEFAULT_INTEGER_MAXIMUM = 4_294_967_296 // 2^32

  /**
   * The default minimum for random bigint generation
   * ***(inclusive by default)***.
   *
   * @default 0n
   */
  static DEFAULT_BIGINT_MINIMUM = 0n

  /**
   * The default maximum **(2^64)** for random bigint generation
   * ***(exclusive by default)***.
   *
   * @default 18446744073709551616n
   */
  static DEFAULT_BIGINT_MAXIMUM = 18_446_744_073_709_551_616n // 2^64

  // ---------------------------------------------------------------------------

  private readonly _name: string

  constructor (name: string) {
    this._name = name
  }

  // ---------------------------------------------------------------------------

  protected _isSeedSupported (): boolean {
    throw new Error('_isSeedSupported() must be implemented.')
  }

  protected _setSeed (seed: number): void {
    throw new Error('_setSeed() must be implemented.')
  }

  protected _getSeed (): number {
    throw new Error('_getSeed() must be implemented.')
  }

  protected _next (): number {
    throw new Error('_next() must be implemented.')
  }

  // ---------------------------------------------------------------------------

  get name (): string {
    return this._name
  }

  get isSeedSupported (): boolean {
    return this._isSeedSupported()
  }

  // ---------------------------------------------------------------------------

  setSeed (seed: number): void {
    this._setSeed(seed)
  }

  getSeed (): number {
    return this._getSeed()
  }

  nextBoolean (): boolean {
    return this._next() < 0.5
  }

  nextInteger (
    min = RandomEngine.DEFAULT_INTEGER_MINIMUM,
    max = RandomEngine.DEFAULT_INTEGER_MAXIMUM,
    includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM,
    includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM
  ): number {
    let minOffset = 0
    let maxOffset = 0

    // default (most common) - range [minimum, maximum)
    if (includeMin && !includeMax) {
      minOffset = 0
      maxOffset = 0

    // second most common - range [minimum, maximum]
    } else if (includeMin && includeMax) {
      maxOffset = 1

    // generally uncommon - range [minimum, maximum)
    } else if (!includeMin && includeMax) {
      minOffset = 1

    // uncommon - range (minimum, maximum)
    } else {
      minOffset = 1
      maxOffset = -1
    }

    return Math.floor(this._next() * (max - min + maxOffset)) + min + minOffset
  }

  nextFloat (
    min = RandomEngine.DEFAULT_FLOAT_MINIMUM,
    max = RandomEngine.DEFAULT_FLOAT_MAXIMUM,
    includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM,
    includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM
  ): number {
    const initialResult = this._next() * (max - min) + min

    // default (most common) - range [minimum, maximum)
    if (includeMin && !includeMax) {
      return initialResult

    } else {
      const adjustedResult = initialResult + (Number.EPSILON * initialResult)

      // second most common - range [minimum, maximum]
      if (includeMin && includeMax) {
        /* istanbul ignore next */
        return adjustedResult < max
          ? adjustedResult
          : max

      // generally uncommon - range [minimum, maximum)
      } else if (!includeMin && includeMax) {
        /* istanbul ignore next */
        return adjustedResult > min
          ? adjustedResult
          : min + Number.EPSILON

      // uncommon - range (minimum, maximum)
      } else {
        /* istanbul ignore next */
        if (adjustedResult <= min) {
          return min + Number.EPSILON

        /* istanbul ignore next */
        } else if (adjustedResult >= max) {
          return max - Number.EPSILON
        }

        return adjustedResult
      }
    }
  }

  nextBigInt (
    min = RandomEngine.DEFAULT_BIGINT_MINIMUM,
    max = RandomEngine.DEFAULT_BIGINT_MAXIMUM,
    includeMin = RandomEngine.DEFAULT_INCLUDE_MINIMUM,
    includeMax = RandomEngine.DEFAULT_INCLUDE_MAXIMUM
  ): bigint {
    let minOffset = 0n
    let maxOffset = 0n

    // default (most common) - range [minimum, maximum)
    if (includeMin && !includeMax) {
      minOffset = 0n
      maxOffset = 0n

    // second most common - range [minimum, maximum]
    } else if (includeMin && includeMax) {
      maxOffset = 1n

    // generally uncommon - range [minimum, maximum)
    } else if (!includeMin && includeMax) {
      minOffset = 1n

    // uncommon - range (minimum, maximum)
    } else {
      minOffset = 1n
      maxOffset = -1n
    }

    return (
      BigInt(Math.floor(this._next() * Number.MAX_SAFE_INTEGER)) *
      (BigInt(max) - BigInt(min) + maxOffset) /
      BigInt(Number.MAX_SAFE_INTEGER)
    ) +
      BigInt(min) + minOffset
  }

  nextString (length: number, charset: string): string {
    const arrayLength = charset.length

    let result = ''

    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(this._next() * arrayLength))
    }

    return result
  }

  /**
   * Randomly returns an element determined by the weights.
   *
   * @param elements The elements to choose one from.
   * @param weights The weights of each elements.
   * @returns The random chosen element.
   */
  nextWeighted <T> (elements: ArrayLike<T>, weights: number[]): T {
    let totalWeight = 0

    // calculate the total weights
    for (let i = 0; i < weights.length; i++) {
      totalWeight += weights[i]
    }

    const randomValue = this._next() * totalWeight

    let cumulativeWeight = 0

    // loop through the elements (and their corresponding weights)
    for (let i = 0; i < elements.length; i++) {
      // add the current element's weight to the cumulative weight
      cumulativeWeight += weights[i]

      // return if the cumulative weight is larger, than the previously generated random value
      if (cumulativeWeight > randomValue) {
        return elements[i]
      }
    }

    // fallback (most cases should not be reached)
    return elements[elements.length - 1]
  }

  pickArray <T> (array: ArrayLike<T>): T {
    return array[Math.floor(this._next() * array.length)]
  }

  /**
   * Shuffles the array **in place** by randomizing its elements using the
   * modern version of the ***Fisher–Yates algorithm by Richard Durstenfeld***.
   *
   * @param array The array to shuffle **in place**.
   *
   * @link https://en.wikipedia.org/wiki/Fisher-Yates_shuffle#The_modern_algorithm
   */
  shuffleArray <T> (array: T[]): void {
    let randomIndex: number
    let temp: T

    // loop through the array starting from the last element, going backwards
    for (let index = array.length - 1; index > 0; index--) {
      // generate a random index in range of [0, i] - (i === index + 1 (thus making inclusive)),
      // as the result of the loop going backwards, the range of [0, i] will be decreased
      // in each iteration
      randomIndex = Math.floor(this._next() * (index + 1))

      // swap elements
      temp = array[index]
      array[index] = array[randomIndex]
      array[randomIndex] = temp
    }
  }
}
