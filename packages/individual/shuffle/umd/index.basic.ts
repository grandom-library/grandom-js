import BasicEngine from '@grandom/engines/basic'
import RandomShuffle from '../src/RandomShuffle'

const random = new RandomShuffle(new BasicEngine())
const shuffle = random.shuffle.bind(random)

// make internals accessible in UMD
Object.defineProperties(shuffle, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomShuffle: {
    value: RandomShuffle
  }
})

export default shuffle
