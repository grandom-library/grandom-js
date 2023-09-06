import { RandomGenerator } from '../../src'
import { TestEngine } from '../fixtures'

describe('RandomGenerator', () => {
  test('basics', () => {
    class CustomGenerator extends RandomGenerator {}
    const generator = new CustomGenerator(new TestEngine())

    expect(generator.engine.name).toBe('test-engine')
  })

  describe('errors', () => {
    describe('invalid constructor arguments', () => {
      test('invalid constructor argument (no argument passed)', () => {
        // @ts-expect-error
        expect(() => new RandomGenerator()).toThrowWithMessage(
          TypeError,
          'Engine must be an instance of RandomEngine, got: undefined (typeof === \'undefined\').'
        )
      })

      test('invalid constructor argument (not an instance of RandomEngine)', () => {
        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        class CustomClass {}

        // @ts-expect-error
        expect(() => new RandomGenerator(new CustomClass())).toThrowWithMessage(
          TypeError,
          'Engine must be an instance of RandomEngine, got: [object Object] (typeof === \'object\').'
        )
      })
    })
  })
})
