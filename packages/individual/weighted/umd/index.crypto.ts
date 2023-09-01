import CryptoEngine from '@grandom/engines/crypto'
import RandomWeighted from '../src/RandomWeighted'

const random = new RandomWeighted(new CryptoEngine())
const weighted = random.weighted.bind(random)

// make internals accessible in UMD
Object.defineProperties(weighted, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomWeighted: {
    value: RandomWeighted
  }
})

export default weighted
