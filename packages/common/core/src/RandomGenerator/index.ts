import RandomEngine from '../RandomEngine'

/**
 * Core random generator class to use to build
 * custom random value/data generators.
 */
export default class RandomGenerator {
  protected _engine: RandomEngine

  constructor (engine: RandomEngine) {
    /*
      provide a valid constructor argument check,
      where TS types are not present or circumvented
    */
    if (!(engine instanceof RandomEngine)) {
      throw new TypeError(
        'Engine must be an instance of RandomEngine, got: ' +
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${engine} (typeof === '${typeof engine}').`
      )
    }

    this._engine = engine
  }

  get engine (): RandomEngine {
    return this._engine
  }
}
