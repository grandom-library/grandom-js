import BasicEngine from '@grandom/engines/basic'
import RandomNumber from '../src/RandomNumber'

const random = new RandomNumber(new BasicEngine())
const number = random.number.bind(random)

// make internals accessible in UMD
Object.defineProperties(number, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomNumber: {
    value: RandomNumber
  }
})

export default number
