import { RandomEngine } from '@grandom/core'

export default class MathRandomEngine extends RandomEngine {
  constructor () {
    super('math-random')
  }

  _next (): number {
    return Math.random()
  }
}
