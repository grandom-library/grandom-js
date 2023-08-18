import grandom from '../src'

describe('grandom', () => {
  test('basics', () => {
    expect(grandom.bigint).toBeFunction()
    expect(grandom.boolean).toBeFunction()
    expect(grandom.number).toBeFunction()
    expect(grandom.string).toBeFunction()
    expect(grandom.pick).toBeFunction()
  })
})
