import BasicEngine from '@grandom/engines/basic'
import RandomString from '../src/RandomString'

const random = new RandomString(new BasicEngine())
const string = random.string.bind(random)

// make internals accessible in UMD
Object.defineProperties(string, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomString: {
    value: RandomString
  }
})

export default string
