import SeededEngine from '@grandom/engines/mt19937'
import RandomShuffle from './RandomShuffle'

const random = new RandomShuffle(new SeededEngine())

export default random.shuffle
