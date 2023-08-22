import BasicEngine from '@grandom/engines/basic'

import RandomBigInt from '@grandom/bigint/RandomBigInt'
import RandomBoolean from '@grandom/boolean/RandomBoolean'
import RandomNumber from '@grandom/number/RandomNumber'
import RandomPick from '@grandom/pick/RandomPick'
import RandomShuffle from '@grandom/shuffle/RandomShuffle'
import RandomString from '@grandom/string/RandomString'

export default class BasicGrandom {
  constructor () {
    const randomEngine = new BasicEngine()

    const randomBigInt = new RandomBigInt(randomEngine)
    const randomBoolean = new RandomBoolean(randomEngine)
    const randomNumber = new RandomNumber(randomEngine)
    const randomPick = new RandomPick(randomEngine)
    const randomShuffle = new RandomShuffle(randomEngine)
    const randomString = new RandomString(randomEngine)

    this.bigint = randomBigInt.bigint.bind(randomBigInt)
    this.boolean = randomBoolean.boolean.bind(randomBoolean)
    this.number = randomNumber.number
    this.pick = randomPick.pick.bind(randomPick)
    this.shuffle = randomShuffle.shuffle.bind(randomShuffle)
    this.string = randomString.string.bind(randomString)
  }

  bigint: InstanceType<typeof RandomBigInt>['bigint']
  boolean: InstanceType<typeof RandomBoolean>['boolean']
  number: InstanceType<typeof RandomNumber>['number']
  pick: InstanceType<typeof RandomPick>['pick']
  shuffle: InstanceType<typeof RandomShuffle>['shuffle']
  string: InstanceType<typeof RandomString>['string']
}
