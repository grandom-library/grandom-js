import BasicEngine from '@grandom/engines/basic'
import RandomBigInt from '../src/RandomBigInt'

const random = new RandomBigInt(new BasicEngine())
const bigint = random.bigint.bind(random)

// make internals accessible in UMD
Object.defineProperties(bigint, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomBigInt: {
    value: RandomBigInt
  }
})

export default bigint
