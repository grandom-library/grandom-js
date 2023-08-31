import {
  BasicEngine,
  SeedableEngine as SeededEngine,
  CryptoEngine
} from '@grandom/engines'

import RandomBigInt from '../src/RandomBigInt'

const random = new RandomBigInt(new BasicEngine())
const bigint = random.bigint.bind(random)

// make internals accessible in UMD
Object.defineProperties(bigint, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBigInt: {
    value: RandomBigInt
  }
})

export default bigint
