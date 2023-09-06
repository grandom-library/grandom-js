// TODO: add seed capability
// TODO: check constructor arg for valid type
// TODO: handle typed arrays
// TODO: handle Maps and Sets

import { RandomGenerator, RandomEngine } from '@grandom/core'

import RandomStringShuffle from './RandomStringShuffle'
import RandomArrayShuffle from './RandomArrayShuffle'
import RandomObjectShuffle from './RandomObjectShuffle'

export default class RandomShuffle extends RandomGenerator {
  constructor (engine: RandomEngine) {
    super(engine)

    const stringShuffle = new RandomStringShuffle(engine)
    const arrayShuffle = new RandomArrayShuffle(engine)
    const objectShuffle = new RandomObjectShuffle(engine)

    const shuffle = (arg1: any, arg2?: any, arg3?: any): any => {
      if (typeof arg1 !== 'undefined') {
        if (stringShuffle.canBeParsed(arg1)) {
          return stringShuffle.parse(arg1, arg2, arg3)
        } else if (arrayShuffle.canBeParsed(arg1)) {
          return arrayShuffle.parse(arg1, arg2, arg3)
        } else if (objectShuffle.canBeParsed(arg1)) {
          return objectShuffle.parse(arg1, arg2, arg3)
        }
      }

      throw new TypeError(
        'Must be called with a string, array, or object, got: ' +
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${arg1} (typeof === '${typeof arg1}').`
      )
    }

    shuffle.string = stringShuffle.shuffle
    shuffle.array = arrayShuffle.shuffle
    shuffle.object = objectShuffle.shuffle

    this.shuffle = shuffle
  }

  shuffle: InstanceType<typeof RandomStringShuffle>['shuffle'] &
  InstanceType<typeof RandomArrayShuffle>['shuffle'] &
  InstanceType<typeof RandomObjectShuffle>['shuffle'] & {
    string: InstanceType<typeof RandomStringShuffle>['shuffle']
    array: InstanceType<typeof RandomArrayShuffle>['shuffle']
    object: InstanceType<typeof RandomObjectShuffle>['shuffle']
  }
}
