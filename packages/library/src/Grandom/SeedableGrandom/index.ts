import MT19937Engine from '@grandom/engines/mt19937'

import RandomBigInt from '@grandom/bigint/RandomBigInt'
import RandomBoolean from '@grandom/boolean/RandomBoolean'
import RandomNumber from '@grandom/number/RandomNumber'
import RandomPick from '@grandom/pick/RandomPick'
import RandomShuffle from '@grandom/shuffle/RandomShuffle'
import RandomString from '@grandom/string/RandomString'
import RandomWeighted from '@grandom/weighted/RandomWeighted'

export default class SeedableGrandom {
  private readonly _engine: MT19937Engine
  private _seed: any

  constructor () {
    this._engine = new MT19937Engine()

    const randomBigInt = new RandomBigInt(this._engine)
    const randomBoolean = new RandomBoolean(this._engine)
    const randomNumber = new RandomNumber(this._engine)
    const randomPick = new RandomPick(this._engine)
    const randomShuffle = new RandomShuffle(this._engine)
    const randomString = new RandomString(this._engine)
    const randomWeighted = new RandomWeighted(this._engine)

    this.bigint = randomBigInt.bigint.bind(randomBigInt)
    this.boolean = randomBoolean.boolean.bind(randomBoolean)
    this.number = randomNumber.number
    this.pick = randomPick.pick.bind(randomPick)
    this.shuffle = randomShuffle.shuffle.bind(randomShuffle)
    this.string = randomString.string.bind(randomString)
    this.weighted = randomWeighted.weighted.bind(randomWeighted)
  }

  get seed (): any {
    return this._seed
  }

  set seed (seed: any) {
    this._seed = seed
  }

  bigint: InstanceType<typeof RandomBigInt>['bigint']
  boolean: InstanceType<typeof RandomBoolean>['boolean']
  number: InstanceType<typeof RandomNumber>['number']
  pick: InstanceType<typeof RandomPick>['pick']
  shuffle: InstanceType<typeof RandomShuffle>['shuffle']
  string: InstanceType<typeof RandomString>['string']
  weighted: InstanceType<typeof RandomWeighted>['weighted']
}
