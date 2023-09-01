import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomBoolean from '../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())
const boolean = random.boolean.bind(random)

// make internals accessible in UMD
Object.defineProperties(boolean, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBoolean: {
    value: RandomBoolean
  }
})

export default boolean
