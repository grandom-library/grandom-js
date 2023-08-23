import BasicGrandom from '../../../src/Grandom/BasicGrandom'

describe('Grandom', () => {
  test('default usage', () => {
    const grandom = new BasicGrandom()

    expect(grandom.bigint).toBeFunction()
    expect(typeof grandom.bigint()).toBe('bigint')

    expect(grandom.boolean).toBeFunction()
    expect(typeof grandom.boolean()).toBe('boolean')

    expect(grandom.number).toBeFunction()
    expect(typeof grandom.number()).toBe('number')

    expect(grandom.pick).toBeFunction()
    expect(typeof grandom.pick('123')).toBe('string')

    expect(grandom.string).toBeFunction()
    expect(typeof grandom.string()).toBe('string')
  })
})
