import BasicEngine from '@grandom/engines/basic'
import RandomString from './RandomString'

const random = new RandomString(new BasicEngine())
const string = random.string.bind(random)

// @ts-expect-error
// make RandomString accessible in UMD
random.RandomString = RandomString

export default string
