// TODO: implement edge cases
// TODO: implement detailed error handling

/*
const str = random.string({
  length: 8,

  include: [],

  exclude: [
    { numbers: true },
    { letters: true },
    { characters: '...' },
    { strings: ['...'] },
    Filter.NUMBERS,
    Filter.LETTERS,
    'qwerty',
    ['a', 'b', 'c'],
    ['one', 'word', 'c'],
    /\w+/,
    /(word1|word2)/i,
  ]
})
*/

type FilterOptions = {
  numbers?: boolean
  letters?: boolean
  characters?: string | string[],
  strings?: string | string[],
}

export type Filter =
    string
  | string[]
  | FilterOptions
  | FilterOptions[]
  // | RegExp
  // | RegExp[]

// export type Filter = string

type FilterEntry = {

  regexp?: RegExp
}

export default class StringFilter {
  private _filterEntries: FilterEntry[] = []

  constructor (filter?: Filter) {

  }

  get numFilters (): number {
    return this._filterEntries.length
  }

  matches (value: string): boolean {
    return false
  }
}

