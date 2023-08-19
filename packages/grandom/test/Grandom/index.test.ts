import { SeedableEngine } from '@grandom/engines'

import Grandom from '../../src/Grandom'

describe('Grandom', () => {
  test('default usage', () => {
    const grandom = new Grandom()

    expect(grandom.engine.name).toBe('basic')

    expect(grandom.bigint).toBeFunction()
    expect(typeof grandom.bigint()).toBe('bigint')

    expect(grandom.boolean).toBeFunction()
    expect(typeof grandom.boolean()).toBe('boolean')

    expect(grandom.pick).toBeFunction()
    expect(typeof grandom.pick('123')).toBe('string')

    expect(grandom.string).toBeFunction()
    expect(typeof grandom.string()).toBe('string')
  })

  test('set engine', () => {
    const grandom = new Grandom()

    expect(grandom.engine.name).toBe('basic')

    grandom.engine = new SeedableEngine()

    expect(grandom.engine.name).toBe('mt19937')
  })
})
