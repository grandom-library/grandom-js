import CryptoEngine from '@grandom/engines/crypto'
import RandomBoolean from '../src/RandomBoolean'

const random = new RandomBoolean(new CryptoEngine())
const boolean = random.boolean.bind(random)

// make internals accessible in UMD
Object.defineProperties(boolean, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBoolean: {
    value: RandomBoolean
  }
})

export default boolean
