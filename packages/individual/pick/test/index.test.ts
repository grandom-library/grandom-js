import pick from '../src'

describe('@grandom/pick', () => {
  test('strings', () => {
    for (let i = 0; i < 10_000; i++) {
      expect(pick('123')).toBeOneOf(['1', '2', '3'])
    }
  })

  test('arrays', () => {
    for (let i = 0; i < 10_000; i++) {
      expect(pick([1, 2, 3])).toBeOneOf([1, 2, 3])
    }
  })

  test('objects', () => {
    for (let i = 0; i < 10_000; i++) {
      const [key, value] = pick({ a: 1, b: 2, c: 3 })

      expect(`${key}:${value}`).toBeOneOf(['a:1', 'b:2', 'c:3'])
    }
  })
})
