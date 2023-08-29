import SeedableEngine from '@grandom/engines/mt19937'
import RandomBoolean from '../src/RandomBoolean'

const engine = new SeedableEngine()
const random = new RandomBoolean(engine)
const boolean = random.boolean.bind(random)

// make internals accessible in UMD
Object.defineProperties(boolean, {
  SeedableEngine: {
    value: SeedableEngine
  },
  RandomBoolean: {
    value: RandomBoolean
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default boolean
