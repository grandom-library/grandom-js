import {
  LENGTH,
  CharacterStats,
} from '@testyard/stats'

import RandomEngine from '../../src/RandomEngine'

class TestEngine extends RandomEngine {
  _next() {
    return Math.random()
  }
}
describe('RandomEngine', () => {
  test('.nextWeighted()', () => {
    const { add, result } = new CharacterStats()
    const engine = new TestEngine()

    for (let i = 0; i < LENGTH; i++) {
      add(engine.nextWeighted(
        ['A', 'B', 'C', 'D'],
        [1, 2, 3, 4]
      ))
    }

    expect(result.numCharacters).toBe(4)
    expect(result.characters).toEqual(['A', 'B', 'C', 'D'])

    expect(result.lowestValue).toBeGreaterThanOrEqual(0.09)
    expect(result.highestValue).toBeLessThanOrEqual(0.41)
    expect(result.averageValue).toBeWithin(0.24, 0.27)

    expect(result.of('A')).toBeWithin(0.09, 0.12)
    expect(result.of('B')).toBeWithin(0.19, 0.22)
    expect(result.of('C')).toBeWithin(0.29, 0.32)
    expect(result.of('D')).toBeWithin(0.39, 0.42)
  })
})
