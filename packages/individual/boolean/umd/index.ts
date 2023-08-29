import {
  BasicEngine,
  SeedableEngine,
  CryptoEngine
} from '@grandom/engines'

import RandomBoolean from '../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())
const boolean = random.boolean.bind(random)

// make internals accessible in UMD
Object.defineProperties(boolean, {
  BasicEngine: {
    value: BasicEngine
  },
  SeedableEngine: {
    value: SeedableEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBoolean: {
    value: RandomBoolean
  }
})

import wrap from '@grandom/utils/umd/wrap/default'

wrap(
  boolean,
  RandomBoolean, [
    BasicEngine,
    SeedableEngine,
    CryptoEngine
  ]
)

export default boolean
