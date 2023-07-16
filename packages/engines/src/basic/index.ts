import { RandomEngine } from '@grandom/core'

export default class BasicEngine extends RandomEngine {
  _next(): number {
    return Math.random()
  }
}
