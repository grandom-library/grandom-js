import CryptoEngine from '@grandom/engines/crypto'
import RandomPick from '../src/RandomPick'

const random = new RandomPick(new CryptoEngine())
const pick = random.pick.bind(random)

// make internals accessible in UMD
Object.defineProperties(pick, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomPick: {
    value: RandomPick
  }
})

export default pick
