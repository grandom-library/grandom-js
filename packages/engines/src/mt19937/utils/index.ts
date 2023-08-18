/*
  TypeScript implementation of the Mersenne Twister PRNG.
  ==============================================================================

  Based on the works of:
    - Takuji Nishimura & Makoto Matsumoto et al.
    - Isaku Wada
    - Sean McCullough

  TypeScript port by Richard King <richrdkng@gmail.com> (https://richrdkng.com)

  ------------------------------------------------------------------------------

  Sean McCullough wrapped Makoto Matsumoto and Takuji Nishimura's code
  in a namespace (https://gist.github.com/banksean/300494).

  Real versions are due to Isaku Wada - added on 2002/01/09

  Sean McCullough <banksean@gmail.com> (https://github.com/banksean)

  ------------------------------------------------------------------------------

  A C-program for MT19937, with initialization improved 2002/1/26.
  Coded by Takuji Nishimura and Makoto Matsumoto.

  Before using, initialize the state by using init_genrand(seed)
  or init_by_array(init_key, key_length).

  BSD 3-Clause License

  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

  1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

  3. The names of its contributors may not be used to endorse or promote
    products derived from this software without specific prior written
    permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  Any feedback is very welcome.
  http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
  email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

// -----------------------------------------------------------------------------

// Period parameters
const N = 624 // state size
const M = 397 // shift size
const MATRIX_A = 0x9908B0DF // constant vector a
const UPPER_MASK = 0x80000000 // most significant w-r bits
const LOWER_MASK = 0x7FFFFFFF // least significant r bits

export class MT19937 {
  private _mt: number[]
  private _mti: number

  constructor () {
    this._mt = new Array(N) // the array for the state vector
    this._mti = N + 1 // _mti == N+1 means _mt[N] is not initialized
  }

  /**
   * Initializes MT19937 with a number or an array.
   */
  init (seed: number | number[]): void {
    if (Array.isArray(seed)) {
      this.initByArray(seed)
    } else {
      this.initGenRand(seed)
    }
  }

  /**
   * Initializes _mt[N] with a seed.
   */
  initGenRand (seed: number): void {
    this._mt[0] = seed >>> 0

    for (this._mti = 1; this._mti < N; this._mti++) {
      const s = this._mt[this._mti - 1] ^ (this._mt[this._mti - 1] >>> 30)

      this._mt[this._mti] = (
        (
          (((s & 0XFFFF0000) >>> 16) * 1812433253) << 16) +
          (s & 0X0000FFFF) * 1812433253
      ) +
        this._mti

      this._mt[this._mti] >>>= 0
    }
  }

  /**
   * Initialize by an array.
   *
   * @param initKey - the array for initializing keys
   */
  initByArray (initKey: number[]): void {
    let i = 1
    let j = 0
    let k = N > initKey.length ? N : initKey.length

    // The constant 19650218 is the birthday of one of the authors, chosen
    // without reason (https://eprint.iacr.org/2005/165.pdf - page 4)
    this.initGenRand(19650218)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    for (; k; k--) {
      const s = this._mt[i - 1] ^ (this._mt[i - 1] >>> 30)

      this._mt[i] = (
        this._mt[i] ^ (((((s & 0xFFFF0000) >>> 16) * 1664525) << 16) +
          ((s & 0X0000FFFF) * 1664525))
      ) +
        initKey[j] + j /* non linear */

      this._mt[i] >>>= 0

      i++
      j++

      if (i >= N) {
        this._mt[0] = this._mt[N - 1]
        i = 1
      }

      if (j >= initKey.length) {
        j = 0
      }
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    for (k = N - 1; k; k--) {
      const s = this._mt[i - 1] ^ (this._mt[i - 1] >>> 30)

      this._mt[i] = (this._mt[i] ^ (((((s & 0XFFFF0000) >>> 16) * 1566083941) << 16) +
        (s & 0X0000FFFF) * 1566083941)) -
        i /* non linear */

      this._mt[i] >>>= 0

      i++

      if (i >= N) {
        this._mt[0] = this._mt[N - 1]
        i = 1
      }
    }

    // MSB is 1; assuring non-zero initial array
    this._mt[0] = 0x80000000
  }

  /**
   * Generates a random number on [0, 4294967295]-interval.
   */
  genRandInt32 (): number {
    let y: number
    const mag01: number[] = [0, MATRIX_A]

    if (this._mti >= N) { /* generate N words at one time */
      let kk: number

      // if initGenRand() has not been called
      // then a default initial seed is used
      if (this._mti === N + 1) {
        this.initGenRand(5489)
      }

      for (kk = 0; kk < N - M; kk++) {
        y = (this._mt[kk] & UPPER_MASK) | (this._mt[kk + 1] & LOWER_MASK)
        this._mt[kk] = this._mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1]
      }

      for (; kk < N - 1; kk++) {
        y = (this._mt[kk] & UPPER_MASK) | (this._mt[kk + 1] & LOWER_MASK)
        this._mt[kk] = this._mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1]
      }

      y = (this._mt[N - 1] & UPPER_MASK) | (this._mt[0] & LOWER_MASK)
      this._mt[N - 1] = this._mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]
      this._mti = 0
    }

    y = this._mt[this._mti++]

    // tempering
    y ^= y >>> 11
    y ^= (y << 7) & 0x9D2C5680
    y ^= (y << 15) & 0xEFC60000
    y ^= y >>> 18

    return y >>> 0
  }

  /**
   * Generates a random number on [0.0, 1.0]-interval.
   */
  genRandReal1 (): number {
    return this.genRandInt32() * (1 / 4294967295) // divided by 2^32-1
  }

  /**
   * Generates a random number on [0.0, 1.0)-interval
   * (same interval as Math.random).
   */
  genRandReal2 (): number {
    return this.genRandInt32() * (1 / 4294967296) // divided by 2^32
  }

  /**
   * Generates a random number on (0.0, 1.0)-real-interval.
   */
  genRandReal3 (): number {
    return (this.genRandInt32() + 0.5) * (1 / 4294967296) // divided by 2^32
  }

  /**
   * Generates a random number on [0.0, 1.0) with 53-bit resolution.
   */
  genRandRes53 (): number {
    const a = this.genRandInt32() >>> 5
    const b = this.genRandInt32() >>> 6

    return (a * 67108864.0 + b) * (1 / 9007199254740992.0)
  }
}
