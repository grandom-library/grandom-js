const config = require('../../../shared/rollup.config')
const pkg = require('./package.json')

module.exports = [
  config.getCommonJSConfig(),

  // UMD full build with every engine in it ------------------------------------
  config.getUMDConfig(
    pkg,
    'grandomEngines',
    'umd/index.ts',
    'dist-umd/min.js'
  ),

  // UMD build with BasicEngine only -------------------------------------------
  config.getUMDConfig(
    pkg,
    'grandomEnginesBasic',
    'umd/index.basic.ts',
    'dist-umd/min.basic.js'
  ),

  // UMD build with SeededEngine only ------------------------------------------
  config.getUMDConfig(
    pkg,
    'grandomEnginesSeeded',
    'umd/index.seeded.ts',
    'dist-umd/min.seeded.js'
  ),

  // UMD build with CryptoEngine only ------------------------------------------
  config.getUMDConfig(
    pkg,
    'grandomEnginesCrypto',
    'umd/index.crypto.ts',
    'dist-umd/min.crypto.js'
  )
]
