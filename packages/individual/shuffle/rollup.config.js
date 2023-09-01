const config = require('../../../shared/rollup.config')
const pkg = require('./package.json')

module.exports = [
  ...config.getDefaultConfig(pkg, 'grandomShuffle')
]
