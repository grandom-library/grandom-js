import BasicEngine from '@grandom/engines/basic'
import RandomBigInt from './RandomBigInt'

const random = new RandomBigInt(new BasicEngine())
const bigint = random.bigint.bind(random)

// @ts-expect-error
// make RandomBigInt accessible in UMD
bigint.RandomBigInt = RandomBigInt

export default bigint
