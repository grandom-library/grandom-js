import BasicEngine from '@grandom/engines/basic'
import RandomWeighted from '../src/RandomWeighted'

const random = new RandomWeighted(new BasicEngine())
const weighted = random.weighted.bind(random)

// make internals accessible in UMD
Object.defineProperties(weighted, {
  BasicEngine: {
    value: BasicEngine
  },
  RandomWeighted: {
    value: RandomWeighted
  }
})

export default weighted
