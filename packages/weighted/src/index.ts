import BasicEngine from '@grandom/engines/basic'
import RandomWeighted from './RandomWeighted'

const random = new RandomWeighted(new BasicEngine())
const weighted = random.weighted.bind(random)

// @ts-expect-error
// make RandomWeighted accessible in UMD
random.RandomWeighted = RandomWeighted

export default weighted
