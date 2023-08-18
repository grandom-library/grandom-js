import Grandom from '../../src/Grandom'

describe('Grandom', () => {
  test('x', () => {
    const grandom = new Grandom()

    console.log(grandom.engine())

    console.log(grandom.boolean())
    console.log(grandom.boolean())
    console.log(grandom.boolean())
    console.log(grandom.boolean())
    console.log(grandom.boolean())
  })
})
