import SeededEngine from '@grandom/engines/mt19937'
import RandomNumber from '../src/RandomNumber'

const engine = new SeededEngine()
const random = new RandomNumber(engine)
const number = random.number.bind(random)

// make internals accessible in UMD
Object.defineProperties(number, {
  SeededEngine: {
    value: SeededEngine
  },
  RandomNumber: {
    value: RandomNumber
  },
  seed: {
    get: () => engine.seed,
    set: (seed: any) => { engine.seed = seed }
  }
})

export default number
