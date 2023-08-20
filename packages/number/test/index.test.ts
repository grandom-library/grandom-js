import number from '../src'

describe('@grandom/number', () => {
  test('default usage', () => {
    expect(number).toBeFunction()
    expect(number()).toBeNumber()
    expect(number()).toBeWithin(0, 1)

    expect(number.float).toBeFunction()
    expect(number.float()).not.toBeInteger()
    expect(number.float()).toBeWithin(0, 1)

    expect(number.integer).toBeFunction()
    expect(number.integer()).toBeInteger()
    expect(number.integer()).toBeWithin(0, 4_294_967_296)
  })
})
