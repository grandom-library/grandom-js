import CryptoEngine from '../../src/crypto'

describe('CryptoEngine', () => {
  describe('environments', () => {
    test('no crypto support in environment', () => {
      const _isBrowserEnvironment = jest
        .spyOn(CryptoEngine.prototype as any, '_isBrowserEnvironment')
        .mockImplementation(() => false)

      const _isNodeJSEnvironment = jest
        .spyOn(CryptoEngine.prototype as any, '_isNodeJSEnvironment')
        .mockImplementation(() => false)

      expect(_isBrowserEnvironment).not.toHaveBeenCalled()
      expect(_isNodeJSEnvironment).not.toHaveBeenCalled()

      expect(() => new CryptoEngine()).toThrowWithMessage(
        Error,
        'Secure random number generation is not supported in this environment.'
      )

      expect(_isBrowserEnvironment).toHaveBeenCalledTimes(1)
      expect(_isNodeJSEnvironment).toHaveBeenCalledTimes(1)
    })
  })
})
