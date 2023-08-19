import { RandomGenerator } from '../../src'
import { TestEngine, StrangeTestEngine } from '../fixtures'

describe('RandomGenerator', () => {
  test('basics', () => {
    class CustomGenerator extends RandomGenerator<TestEngine> {}
    const generator = new CustomGenerator(new TestEngine())

    expect(generator.getEngine().name).toBe('test-engine')

    generator.setEngine(new StrangeTestEngine())

    expect(generator.getEngine().name).toBe('strange-test-engine')
  })
})
