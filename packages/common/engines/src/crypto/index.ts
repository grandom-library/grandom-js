import { RandomEngine } from '@grandom/core'

export default class CryptoEngine extends RandomEngine {
  constructor () {
    super('crypto')

    if (this._isBrowserEnvironment()) {
      this._next = this._initBrowserCrypto()
    } else if (this._isNodeJSEnvironment()) {
      this._next = this._initNodeJSCrypto()
    } else {
      throw new Error('Secure random number generation is not supported in this environment.')
    }
  }

  protected _isBrowserEnvironment (): boolean {
    // @ts-expect-error
    return typeof window !== 'undefined' && 'getRandomValues' in window?.crypto
  }

  protected _isNodeJSEnvironment (): boolean {
    return typeof require !== 'undefined'
  }

  protected _initBrowserCrypto (): () => number {
    return () => {
      // use a buffer of 4 bytes (32 bits), then fill the buffer
      // with random bytes, then normalize to range [0.0, 1.0)
      // -----------------------------------------------------------------------

      const buffer = new Uint8Array(4)

      // @ts-expect-error
      window.crypto.getRandomValues(buffer)

      return Math.abs(
        (
          (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3]
        ) / 4_294_967_296
      )
    }
  }

  protected _initNodeJSCrypto (): () => number {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto')

    return () => {
      // generate 4 random bytes, then convert to a 32-bit unsigned integer,
      // then normalize to range [0.0, 1.0)
      // -----------------------------------------------------------------------

      return crypto
        .randomBytes(4)
        .readUInt32BE(0) / 4_294_967_296
    }
  }
}
