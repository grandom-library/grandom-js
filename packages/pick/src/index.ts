import { BasicEngine } from '@grandom/engines'
import RandomPick from './RandomPick'

const random = new RandomPick(new BasicEngine())
const pick = random.pick.bind(random)

export default pick
