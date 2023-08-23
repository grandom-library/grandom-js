import RandomEngine from '../RandomEngine'

/**
 * Core random generator class to use to build
 * custom random value/data generators.
 */
export default class RandomGenerator {
  protected _engine: RandomEngine

  constructor (engine: RandomEngine) {
    this._engine = engine
  }

  get engine (): RandomEngine {
    return this._engine
  }
}
