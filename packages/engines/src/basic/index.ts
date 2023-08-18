import { RandomEngine } from '@grandom/core'

export default class BasicEngine extends RandomEngine {
  constructor () {
    super('basic')
  }

  _isSeedSupported (): boolean {
    return false
  }

  _next (): number {
    return Math.random()
  }
}
