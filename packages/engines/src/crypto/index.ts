import { RandomEngine } from '@grandom/core'

export default class CryptoEngine extends RandomEngine {
  constructor () {
    super('crypto')

    // handle browser ------------------------------------------------------------------------------
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {

      // use a buffer of 4 bytes (32 bits), then fill the buffer with random bytes,
      // then normalize to range [0.0, 1.0)
      this._next = () => {
        const buffer = new Uint8Array(4)

        // @ts-expect-error
        window.crypto.getRandomValues(buffer)

        return Math.abs(
          ((buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]) / 4_294_967_296
        )
      }

    // handle Node.js ------------------------------------------------------------------------------
    } else if (typeof require !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const crypto = require('crypto')

      // generate 4 random bytes, then convert to a 32-bit unsigned integer,
      // then normalize to range [0.0, 1.0)
      this._next = () => {
        return crypto
          .randomBytes(4)
          .readUInt32BE(0) / 4_294_967_296
      }
    } else {
      throw new Error('Secure random number generation is not supported in this environment.')
    }
  }

  _isSeedSupported (): boolean {
    return false
  }
}
