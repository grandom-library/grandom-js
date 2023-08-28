import CryptoEngine from '@grandom/engines/crypto'
import RandomBigInt from '../src/RandomBigInt'

const random = new RandomBigInt(new CryptoEngine())
const bigint = random.bigint.bind(random)

// make internals accessible in UMD
Object.defineProperties(bigint, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomBigInt: {
    value: RandomBigInt
  }
})

export default bigint
