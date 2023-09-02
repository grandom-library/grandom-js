const glob = require('glob')

const config = require('../../shared/rollup.config')
const pkg = require('./package.json')

module.exports = [
  config.getCommonJSConfig([
    ...glob.sync('src/**/*.ts')
  ]),

  config.getUMDConfig(
    pkg,
    'grandom',
    'umd/index.ts',
    'dist-umd/min.js'
  )
]
