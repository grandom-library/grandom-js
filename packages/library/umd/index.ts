import BasicEngine from '@grandom/engines/basic'
import CryptoEngine from '@grandom/engines/crypto'
import SeededEngine from '@grandom/engines/mt19937'
import SeededGrandom from '../src/Grandom/SeededGrandom'

const grandom = new SeededGrandom()

// make internals accessible in UMD
Object.defineProperties(grandom, {
  BasicEngine: {
    value: BasicEngine
  },
  CryptoEngine: {
    value: CryptoEngine
  },
  SeededEngine: {
    value: SeededEngine
  }
})

export default grandom
