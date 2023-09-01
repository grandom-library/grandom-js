import SeededEngine from '@grandom/engines/mt19937'
import RandomWeighted from '../src/RandomWeighted'

const engine = new SeededEngine()
const random = new RandomWeighted(engine)
const weighted = random.weighted.bind(random)

// make internals accessible in UMD
Object.defineProperties(weighted, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomWeighted: {
    value: RandomWeighted
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default weighted
