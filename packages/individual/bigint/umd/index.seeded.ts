import SeededEngine from '@grandom/engines/mt19937'
import RandomBigInt from '../src/RandomBigInt'

const engine = new SeededEngine()
const random = new RandomBigInt(engine)
const bigint = random.bigint.bind(random)

// make internals accessible in UMD
Object.defineProperties(bigint, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomBigInt: {
    value: RandomBigInt
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default bigint
