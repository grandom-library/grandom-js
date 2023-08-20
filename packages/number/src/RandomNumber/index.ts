import { RandomGenerator, RandomEngine } from '@grandom/core'

import RandomFloat from '../float/RandomFloat'
import RandomInteger from '../integer/RandomInteger'

export default class RandomNumber extends RandomGenerator {
  private readonly _randomFloat: RandomFloat
  private readonly _randomInteger: RandomInteger

  constructor (engine: RandomEngine) {
    super(engine)

    this._randomFloat = new RandomFloat(engine)
    this._randomInteger = new RandomInteger(engine)

    this.float = this._randomFloat.float.bind(this._randomFloat)
    this.integer = this._randomInteger.integer.bind(this._randomInteger)
  }

  float: InstanceType<typeof RandomFloat>['float']
  integer: InstanceType<typeof RandomInteger>['integer']
}
