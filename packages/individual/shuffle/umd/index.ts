import BasicEngine from '@grandom/engines/basic'
import SeededEngine from '@grandom/engines/mt19937'
import CryptoEngine from '@grandom/engines/crypto'
import RandomShuffle from '../src/RandomShuffle'

const random = new RandomShuffle(new BasicEngine())
const shuffle = random.shuffle

// make internals accessible in UMD
Object.defineProperties(shuffle, {
  BasicEngine: {
    value: BasicEngine
  },
  SeededEngine: {
    value: SeededEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  RandomShuffle: {
    value: RandomShuffle
  }
})

export default shuffle
