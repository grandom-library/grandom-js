import {
  BasicEngine,
  SeedableEngine,
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
  SeedableEngine: {
    value: SeedableEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBigInt: {
    value: RandomBigInt
  }
})

export default bigint
