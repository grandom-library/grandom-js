import { RandomEngine } from '@grandom/core'
import { MT19937 } from './utils'

export default class MT19937Engine extends RandomEngine {
  private readonly _engine: MT19937

  constructor () {
    super('mt19937')

    this._engine = new MT19937()
    this._engine.init(Math.floor(Math.random() * Math.pow(10, 13)))
  }

  _isSeedSupported (): boolean {
    return true
  }

  _next (): number {
    return this._engine.genRandReal2()
  }
}
