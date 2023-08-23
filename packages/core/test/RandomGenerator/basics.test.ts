import { RandomGenerator } from '../../src'
import { TestEngine } from '../fixtures'

describe('RandomGenerator', () => {
  test('basics', () => {
    class CustomGenerator extends RandomGenerator {}
    const generator = new CustomGenerator(new TestEngine())

    expect(generator.engine.name).toBe('test-engine')
  })
})
