import { BasicEngine } from '@grandom/engines'
import RandomPick from '../../src/RandomPick'

const random = new RandomPick(new BasicEngine())

describe('RandomPick', () => {
  describe('.pick()', () => {
    describe('errors', () => {
      test('called with a wrong type (undefined)', () => {
        // @ts-expect-error
        expect(() => random.pick()).toThrowWithMessage(
          TypeError,
          'Must be called with a string, array, or object, got: undefined (typeof === \'undefined\').'
        )
      })

      test('called with a wrong type (null)', () => {
        // @ts-expect-error
        expect(() => random.pick(null)).toThrowWithMessage(
          TypeError,
          'Must be called with a string, array, or object, got: null (typeof === \'object\').'
        )
      })
    })
  })
})
