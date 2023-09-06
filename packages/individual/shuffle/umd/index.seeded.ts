import SeededEngine from '@grandom/engines/mt19937'
import RandomShuffle from '../src/RandomShuffle'

const engine = new SeededEngine()
const random = new RandomShuffle(engine)
const shuffle = random.shuffle

// make internals accessible in UMD
Object.defineProperties(shuffle, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomShuffle: {
    value: RandomShuffle
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default shuffle
