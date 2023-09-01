import CryptoEngine from '@grandom/engines/crypto'
import RandomString from '../src/RandomString'

const random = new RandomString(new CryptoEngine())
const string = random.string.bind(random)

// make internals accessible in UMD
Object.defineProperties(string, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomString: {
    value: RandomString
  }
})

export default string
