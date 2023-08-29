import bigint from '../src'

describe('@grandom/bigint', () => {
  test('basic call', () => {
    const result = bigint()

    expect(typeof result).toBe('bigint')
    expect(result).toBeGreaterThanOrEqual(0n)
  })
})
