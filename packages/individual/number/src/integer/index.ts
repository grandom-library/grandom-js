import BasicEngine from '@grandom/engines/basic'
import RandomInteger from './RandomInteger'

const random = new RandomInteger(new BasicEngine())
const integer = random.integer.bind(random)

export default integer
