import randomString from '../src'

describe('@grandom/string', () => {
  test('basic call', () => {
    const str = randomString()

    expect(typeof str).toBe('string')
    expect(str.length).toBeGreaterThan(0)
  })
})
