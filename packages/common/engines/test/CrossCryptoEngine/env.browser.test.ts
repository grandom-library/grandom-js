import crypto from 'node:crypto'
import CryptoEngine from '../../src/CrossCryptoEngine'

describe('CryptoEngine', () => {
  describe('environments', () => {
    test('browser environment', () => {
      const _isBrowserEnvironment = jest
        .spyOn(CryptoEngine.prototype as any, '_isBrowserEnvironment')

      let _getRandomValuesCalled = 0

      // @ts-expect-error
      global.window = {
        crypto: {
          getRandomValues: (buffer: any) => {
            _getRandomValuesCalled++
            return crypto.getRandomValues(buffer)
          }
        }
      }

      expect(_isBrowserEnvironment).not.toHaveBeenCalled()
      expect(_getRandomValuesCalled).toBe(0)

      const engine = new CryptoEngine()

      expect(_isBrowserEnvironment).toHaveBeenCalledTimes(1)

      expect(_getRandomValuesCalled).toBe(0)

      expect(engine.nextBoolean()).toBeBoolean()
      expect(engine.nextBoolean()).toBeBoolean()
      expect(engine.nextBoolean()).toBeBoolean()

      expect(_getRandomValuesCalled).toBe(3)
    })
  })
})
