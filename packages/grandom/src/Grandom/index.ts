import { RandomEngine } from '@grandom/core'
import BasicEngine from '@grandom/engines/basic'

import RandomBigInt from '@grandom/bigint/RandomBigInt'
import RandomBoolean from '@grandom/boolean/RandomBoolean'
// import number from '@grandom/number'
import RandomPick from '@grandom/pick/RandomPick'
import RandomString from '@grandom/string/RandomString'

export default class Grandom {
  private _randomEngine: RandomEngine

  private readonly _randomBigInt: RandomBigInt
  private readonly _randomBoolean: RandomBoolean
  private readonly _randomPick: RandomPick
  private readonly _randomString: RandomString

  constructor ()
  // constructor (engine: RandomEngine)

  // constructor (engine: any, seed: any)
  // constructor (options: any)

  constructor () {
    this._randomEngine = new BasicEngine()

    this._randomBigInt = new RandomBigInt(this._randomEngine)
    this._randomBoolean = new RandomBoolean(this._randomEngine)
    this._randomPick = new RandomPick(this._randomEngine)
    this._randomString = new RandomString(this._randomEngine)

    this.bigint = this._randomBigInt.bigint.bind(this._randomBigInt)
    this.boolean = this._randomBoolean.boolean.bind(this._randomBoolean)
    this.pick = this._randomPick.pick.bind(this._randomPick)
    this.string = this._randomString.string.bind(this._randomString)
  }

  get engine (): RandomEngine {
    return this._randomEngine
  }

  set engine (engine: RandomEngine) {
    this._setEngine(engine)
  }

  seed (): void {}

  bigint: InstanceType<typeof RandomBigInt>['bigint']
  boolean: InstanceType<typeof RandomBoolean>['boolean']
  pick: InstanceType<typeof RandomPick>['pick']
  string: InstanceType<typeof RandomString>['string']

  // ---------------------------------------------------------------------------

  private _setEngine (engine: RandomEngine): void {
    this._randomEngine = engine

    this._randomBigInt.setEngine(this._randomEngine)
    this._randomBoolean.setEngine(this._randomEngine)
    this._randomPick.setEngine(this._randomEngine)
    this._randomString.setEngine(this._randomEngine)
  }
}
