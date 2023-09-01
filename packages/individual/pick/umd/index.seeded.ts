import SeededEngine from '@grandom/engines/mt19937'
import RandomPick from '../src/RandomPick'

const engine = new SeededEngine()
const random = new RandomPick(engine)
const pick = random.pick.bind(random)

// make internals accessible in UMD
Object.defineProperties(pick, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomPick: {
    value: RandomPick
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default pick
