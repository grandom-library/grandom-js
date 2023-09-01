import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
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
