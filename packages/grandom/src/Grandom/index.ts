import { RandomEngine } from '@grandom/core'

// import bigint from '@grandom/bigint'
import RandomBoolean from '@grandom/boolean/RandomBoolean'
// import number from '@grandom/number'
// import string from '@grandom/string'
// import pick from '@grandom/pick'

export default class Grandom {
  private readonly _engine: RandomEngine
  private readonly _randomBoolean: RandomBoolean

  constructor ()
  constructor (engine: any)
  constructor (engine: any, seed: any)
  constructor (options: any)

  constructor (arg1?: any) {
    // @ts-expect-error
    this._engine = new RandomEngine()
    // @ts-expect-error
    this._randomBoolean = new RandomBoolean(this._engine)

    this.boolean = this._randomBoolean.boolean.bind(this._randomBoolean)
  }

  engine (): RandomEngine {
    return this._engine
  }

  // setSeed
  seed (): void {}

  boolean: InstanceType<typeof RandomBoolean>['boolean']
}
