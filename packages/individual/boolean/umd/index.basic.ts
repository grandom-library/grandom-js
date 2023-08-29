import BasicEngine from '@grandom/engines/basic'
import RandomBoolean from '../src/RandomBoolean'

const random = new RandomBoolean(new BasicEngine())
const boolean = random.boolean.bind(random)

// make internals accessible in UMD
Object.defineProperties(boolean, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomBoolean: {
    value: RandomBoolean
  }
})

export default boolean
