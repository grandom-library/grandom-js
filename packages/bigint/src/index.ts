
import BasicEngine from '@grandom/engines/basic'
import RandomBigInt from './RandomBigInt'

const random = new RandomBigInt(new BasicEngine())
const bigint = random.bigint.bind(random)

export default bigint
