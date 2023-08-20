import type RandomFloat from './float/RandomFloat'
import type RandomInteger from './integer/RandomInteger'

import float from './float'
import integer from './integer'

type RandomNumber = InstanceType<typeof RandomFloat>['float'] & {
  float: InstanceType<typeof RandomFloat>['float']
  integer: InstanceType<typeof RandomInteger>['integer']
}

const number: RandomNumber = (arg1?: any, arg2?: any, arg3?: any): number => {
  return float(arg1, arg2, arg3)
}

number.float = float
number.integer = integer

export default number
