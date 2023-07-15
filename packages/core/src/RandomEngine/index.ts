const DEFAULT_INTEGER_MINIMUM = 0
const DEFAULT_INTEGER_MAXIMUM = 4_294_967_296 // 2^32

const DEFAULT_FLOAT_MINIMUM = 0
const DEFAULT_FLOAT_MAXIMUM = 1

const DEFAULT_BIGINT_MINIMUM = 0n
const DEFAULT_BIGINT_MAXIMUM = 18_446_744_073_709_551_616n // 2^64

export default class RandomEngine {
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
    min = DEFAULT_INTEGER_MINIMUM,
    max = DEFAULT_INTEGER_MAXIMUM,
    includeMin = true,
    includeMax = false
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
    min = DEFAULT_BIGINT_MINIMUM,
    max = DEFAULT_BIGINT_MAXIMUM,
    includeMin = true,
    includeMax = false
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

  nextString (): string {
    return ''
  }

  pickString () {}
  pickArray () {}
  pickObject () {}

  shuffleString () {}
  shuffleArray () {}
}
