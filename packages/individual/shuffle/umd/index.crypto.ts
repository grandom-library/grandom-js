import CryptoEngine from '@grandom/engines/crypto'
import RandomShuffle from '../src/RandomShuffle'

const random = new RandomShuffle(new CryptoEngine())
const shuffle = random.shuffle.bind(random)

// make internals accessible in UMD
Object.defineProperties(shuffle, {
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomShuffle: {
    value: RandomShuffle
  }
})

export default shuffle
