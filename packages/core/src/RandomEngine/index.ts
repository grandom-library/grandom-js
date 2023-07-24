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

  get isSeedSupported (): boolean {
    return false
  }

  protected _next (): number {
    return NaN
  }

  setSeed (seed?: any): void {}
  getSeed (): any {}

  nextBoolean (): boolean {
    return this._next() < .5
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

  nextFloat () {
    return this._next()
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
      BigInt(Math.floor(this._next() * Number.MAX_SAFE_INTEGER))
      * (BigInt(max) - BigInt(min) + maxOffset)
      / BigInt(Number.MAX_SAFE_INTEGER)
      )
      + BigInt(min) + minOffset
  }

  nextString (length: number, charset: string): string {
    const arrayLength = charset.length

    let result = ''

    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(this._next() * arrayLength))
    }

    return result
  }

  pickArray <T> (array: ArrayLike<T>): T {
    return array[Math.floor(this._next() * array.length)]
  }
}
