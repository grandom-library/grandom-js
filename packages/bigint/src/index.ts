import BasicEngine from '@grandom/engines/basic'
import RandomBigInt from './RandomBigInt'

const random = new RandomBigInt(new BasicEngine())
const bigint = random.bigint.bind(random)

/* <umd-only> */
// Make internals accessible in UMD --------------------------------------------

// @ts-expect-error
bigint.RandomBigInt = RandomBigInt

// -----------------------------------------------------------------------------
/* </umd-only> */

export default bigint
