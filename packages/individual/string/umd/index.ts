import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomString from '../src/RandomString'

const random = new RandomString(new BasicEngine())
const string = random.string.bind(random)

// make internals accessible in UMD
Object.defineProperties(string, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomString: {
    value: RandomString
  }
})

export default string
