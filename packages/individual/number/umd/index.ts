import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomNumber from '../src/RandomNumber'

const random = new RandomNumber(new BasicEngine())
const number = random.number.bind(random)

// make internals accessible in UMD
Object.defineProperties(number, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomNumber: {
    value: RandomNumber
  }
})

export default number
