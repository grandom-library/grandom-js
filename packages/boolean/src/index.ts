import BasicEngine from '@grandom/engines/basic'
import RandomBoolean from './RandomBoolean'

const random = new RandomBoolean(new BasicEngine())
const boolean = random.boolean.bind(random)

/* <umd-only> */
// Make internals accessible in UMD --------------------------------------------

// @ts-expect-error
boolean.RandomBoolean = RandomBoolean

// -----------------------------------------------------------------------------
/* </umd-only> */


export default boolean
