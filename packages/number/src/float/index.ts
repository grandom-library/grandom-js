import BasicEngine from '@grandom/engines/basic'
import RandomFloat from './RandomFloat'

const random = new RandomFloat(new BasicEngine())
const float = random.float.bind(random)

export default float
