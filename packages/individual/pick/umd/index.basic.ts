import BasicEngine from '@grandom/engines/basic'
import RandomPick from '../src/RandomPick'

const random = new RandomPick(new BasicEngine())
const number = random.pick.bind(random)

// make internals accessible in UMD
Object.defineProperties(number, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomPick: {
    value: RandomPick
  }
})

export default number
