import CryptoEngine from '@grandom/engines/crypto'
import RandomNumber from '../src/RandomNumber'

const random = new RandomNumber(new CryptoEngine())
const number = random.number.bind(random)

// make internals accessible in UMD
Object.defineProperties(number, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomNumber: {
    value: RandomNumber
  }
})

export default number
