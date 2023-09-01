import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomPick from '../src/RandomPick'

const random = new RandomPick(new BasicEngine())
const pick = random.pick.bind(random)

// make internals accessible in UMD
Object.defineProperties(pick, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomPick: {
    value: RandomPick
  }
})

export default pick
