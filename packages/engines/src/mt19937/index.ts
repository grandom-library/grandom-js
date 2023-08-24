import { RandomEngine } from '@grandom/core'
import MT19937 from '@grandom/mt19937'
import fnv1a from '@grandom/fnv1a'

export default class MT19937Engine extends RandomEngine {
  private readonly _engine: MT19937
  private _seed: any

  constructor () {
    super('mt19937')

    this._engine = new MT19937()
    this.seed = Math.floor(Math.random() * new Date().getTime())
  }

  get seed (): any {
    return this._seed
  }

  set seed (seed: any) {
    if (typeof seed === 'number') {
      this._engine.seed = seed
      this._seed = seed
    } else if (typeof seed === 'string') {
      this._engine.seed = fnv1a(seed)
      this._seed = seed
    } else {
      throw new TypeError(
        `Seed must be a number, or a string, got: ${seed} (typeof === '${typeof seed}').`
      )
    }
  }

  _next (): number {
    return this._engine.randomFloat2()
  }
}
