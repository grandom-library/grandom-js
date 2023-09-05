import {
  BasicEngine,
  SeededEngine,
  CryptoEngine,
  DefaultEngine
} from '../src'

describe('@grandom/engines', () => {
  test('basic engine', () => {
    const engine = new BasicEngine()

    expect(engine.name).toBe('math-random')
  })

  test('seeded engine', () => {
    const engine = new SeededEngine()

    expect(engine.name).toBe('mt19937')
  })

  test('crypto engine', () => {
    const engine = new CryptoEngine()

    expect(engine.name).toBe('cross-crypto')
  })

  test('default engine', () => {
    const engine = new DefaultEngine()

    expect(engine.name).toBe('mt19937')
  })
})
