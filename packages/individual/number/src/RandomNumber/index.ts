import { RandomGenerator, RandomEngine } from '@grandom/core'

import RandomFloat from '../float/RandomFloat'
import RandomInteger from '../integer/RandomInteger'

type RandomNumberType = InstanceType<typeof RandomFloat>['float'] & {
  float: InstanceType<typeof RandomFloat>['float']
  integer: InstanceType<typeof RandomInteger>['integer']
}

export default class RandomNumber extends RandomGenerator {
  constructor (engine: RandomEngine) {
    super(engine)

    const randomFloat = new RandomFloat(engine)
    const randomInteger = new RandomInteger(engine)

    const float = randomFloat.float.bind(randomFloat)
    const integer = randomInteger.integer.bind(randomInteger)

    const number: RandomNumberType = (arg1?: any, arg2?: any, arg3?: any): number => {
      return float(arg1, arg2, arg3)
    }

    number.float = float
    number.integer = integer

    this.number = number
  }

  number: RandomNumberType
}
