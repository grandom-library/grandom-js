import MT19937Engine from '../../src/mt19937'

describe('MT19937Engine', () => {
  describe('set/get seed', () => {
    test('auto seed', () => {
      const engine = new MT19937Engine()

      expect(engine.seed).toBeNumber()
      expect(engine.seed).toBeWithin(0, Number.MAX_SAFE_INTEGER)
    })

    describe('set seed', () => {
      test('set seed - number', () => {
        const engine = new MT19937Engine()

        engine.seed = 42

        expect(engine.seed).toBe(42)
        expect(engine.nextInteger()).toBe(1608637542)
        expect(engine.nextInteger()).toBe(3421126067)
        expect(engine.nextInteger()).toBe(4083286876)
        expect(engine.nextInteger()).toBe(787846414)
        expect(engine.nextInteger()).toBe(3143890026)

        engine.seed = 123456789

        expect(engine.seed).toBe(123456789)
        expect(engine.nextInteger()).toBe(2288500408)
        expect(engine.nextInteger()).toBe(4254805660)
        expect(engine.nextInteger()).toBe(2294099250)
        expect(engine.nextInteger()).toBe(56498137)
        expect(engine.nextInteger()).toBe(2188513626)
      })

      test('set seed - string', () => {
        const engine = new MT19937Engine()

        engine.seed = '42'

        expect(engine.seed).toBeString()
        expect(engine.seed).toBe('42')
      })

      test('set seed - unsupported type', () => {
        const engine = new MT19937Engine()

        expect(() => { engine.seed = false }).toThrowWithMessage(
          TypeError,
          'Seed must be a number, or a string, got: false (typeof === \'boolean\').'
        )
      })
    })
  })
})
