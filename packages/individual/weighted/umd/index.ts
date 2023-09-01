import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomWeighted from '../src/RandomWeighted'

const random = new RandomWeighted(new BasicEngine())
const weighted = random.weighted.bind(random)

// make internals accessible in UMD
Object.defineProperties(weighted, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomWeighted: {
    value: RandomWeighted
  }
})

export default weighted
