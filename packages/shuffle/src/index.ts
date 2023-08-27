import BasicEngine from '@grandom/engines/basic'
import RandomShuffle from './RandomShuffle'

const random = new RandomShuffle(new BasicEngine())
const shuffle = random.shuffle.bind(random)

// @ts-expect-error
// make RandomShuffle accessible in UMD
random.RandomShuffle = RandomShuffle

export default shuffle
