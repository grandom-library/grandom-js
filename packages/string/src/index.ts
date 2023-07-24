import BasicEngine from '@grandom/engines/basic'
import RandomString from './RandomString'

const random = new RandomString(new BasicEngine())
const string = random.string.bind(random)

export default string
