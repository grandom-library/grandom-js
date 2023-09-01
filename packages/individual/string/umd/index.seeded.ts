import SeededEngine from '@grandom/engines/mt19937'
import RandomString from '../src/RandomString'

const engine = new SeededEngine()
const random = new RandomString(engine)
const string = random.string.bind(random)

// make internals accessible in UMD
Object.defineProperties(string, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomString: {
    value: RandomString
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default string
