import BasicEngine from '@grandom/engines/basic'
import RandomWeighted from './RandomWeighted'

const random = new RandomWeighted(new BasicEngine())
const weighted = random.weighted.bind(random)

export default weighted
