import RandomEngine from '../../src/RandomEngine'

export class TestEngine extends RandomEngine {
  constructor () {
    super('test-engine')
  }

  _isSeedSupported (): boolean {
    return false
  }

  _next (): number {
    return Math.random()
  }
}

export class StrangeTestEngine extends RandomEngine {
  constructor () {
    super('strange-test-engine')
  }

  _next (): number {
    return 100
  }
}
