const config = require('../../shared/rollup.config')
const pkg = require('./package.json')

module.exports = [
  config.getCommonJSConfig([
    ...config.glob('src/**/*.ts')
  ]),

  config.getUMDConfig(
    pkg,
    'grandom',
    'umd/index.ts',
    'dist-umd/min.js'
  )
]
