import RandomEngine from '../RandomEngine'

/**
 * Core random generator class to use to build
 * custom random value/data generators.
 */
export default class RandomGenerator<T extends RandomEngine> {
  protected _engine: T

  constructor (engine: T) {
    this._engine = engine
  }

  getEngine (): T {
    return this._engine
  }

  setEngine <U extends RandomEngine> (engine: U): void {
    this._engine = engine as unknown as T
  }
}
