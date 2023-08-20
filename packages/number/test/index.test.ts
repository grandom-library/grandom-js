import grandomNumber from '../src'

describe('@grandom/number', () => {
  test('default usage', () => {
    expect(grandomNumber).toBeFunction()
    expect(grandomNumber()).toBeNumber()
    expect(grandomNumber()).toBeWithin(0, 1)

    expect(grandomNumber.float).toBeFunction()
    expect(grandomNumber.float()).not.toBeInteger()
    expect(grandomNumber.float()).toBeWithin(0, 1)

    expect(grandomNumber.integer).toBeFunction()
    expect(grandomNumber.integer()).toBeInteger()
    expect(grandomNumber.integer()).toBeWithin(0, 4_294_967_296)
  })
})
