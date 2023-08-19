import { RandomEngine } from '@grandom/core'
import MT19937 from '@grandom/mt19937'

export default class MT19937Engine extends RandomEngine {
  private readonly _engine: MT19937

  constructor () {
    super('mt19937')

    this._engine = new MT19937(Math.floor(Math.random() * new Date().getTime()))
  }

  _isSeedSupported (): boolean {
    return true
  }

  _next (): number {
    return this._engine.randomFloat2()
  }
}
