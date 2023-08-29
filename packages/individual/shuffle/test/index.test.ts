import shuffle from '../src'

describe('@grandom/shuffle', () => {
  test('default usage', () => {
    expect(shuffle).toBeFunction()
    expect(shuffle('123')).toBeString()
  })
})
