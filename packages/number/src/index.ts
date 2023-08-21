// import type RandomFloat from './float/RandomFloat'
// import type RandomInteger from './integer/RandomInteger'

// // import float from './float'
// // import integer from './integer'

// // type RandomNumber = InstanceType<typeof RandomFloat>['float'] & {
// //   float: InstanceType<typeof RandomFloat>['float']
// //   integer: InstanceType<typeof RandomInteger>['integer']
// // }

// // const number: RandomNumber = (arg1?: any, arg2?: any, arg3?: any): number => {
// //   return float(arg1, arg2, arg3)
// // }

// // number.float = float
// // number.integer = integer

// // export default number

// import BasicEngine from '@grandom/engines/basic'
// import RandomNumber from './RandomNumber'

// const randomNumber = new RandomNumber(new BasicEngine())

// type GrandomNumber = InstanceType<typeof RandomFloat>['float'] & {
//   float: InstanceType<typeof RandomFloat>['float']
//   integer: InstanceType<typeof RandomInteger>['integer']
// }

// const grandomNumber: GrandomNumber = (arg1?: any, arg2?: any, arg3?: any): number => {
//   return randomNumber.float(arg1, arg2, arg3)
// }

// grandomNumber.float = randomNumber.float.bind(randomNumber)
// grandomNumber.integer = randomNumber.integer.bind(randomNumber)

// export default grandomNumber

import BasicEngine from '@grandom/engines/basic'
import RandomNumber from './RandomNumber'

const random = new RandomNumber(new BasicEngine())

export default random.number
