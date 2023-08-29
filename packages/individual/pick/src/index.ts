import BasicEngine from '@grandom/engines/basic'
import RandomPick from './RandomPick'

const random = new RandomPick(new BasicEngine())
const pick = random.pick.bind(random)

// @ts-expect-error
// make RandomPick accessible in UMD
random.RandomPick = RandomPick

export default pick
