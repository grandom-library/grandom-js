const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const size = require('rollup-plugin-filesize')

const glob = require('glob')
const dedent = require('string-dedent')

// -----------------------------------------------------------------------------

const getCommonJSConfig = (input = 'src/index.ts') => ({
  input,

  output: {
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    dir: 'dist'
  },

  external: /@grandom\/.*/,

  plugins: [
    typescript()
  ]
})

const getUMDConfig = (pkg, name, input, output) => {
  const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

  if (!version) {
    throw new Error(`Invalid version, got: "${version}".`)
  }

  const baseUMDConfig = {
    output: {
      format: 'umd',
      sourcemap: true,
      banner: dedent`
        /*!
        * ${pkg.name} v${version}
        * ${pkg.homepage}
        *
        * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
        * Released under the ${pkg.license} License
        * ${pkg.homepage}/blob/main/LICENSE
        *
        * Date: ${new Date().toISOString()}
        */
      `
    },
    plugins: {
      plugins: [
        terser(),
        typescript(),
        commonjs(),
        resolve(),
        size()
      ]
    }
  }

  return {
    input,

    output: {
      ...baseUMDConfig.output,
      file: output,
      name
    },

    ...baseUMDConfig.plugins
  }
}

// -----------------------------------------------------------------------------

module.exports = {
  glob: (pattern) => glob.sync(pattern),
  getCommonJSConfig,
  getUMDConfig,
  getDefaultConfig: (pkg, name) => {
    return [
      getCommonJSConfig(),

      // UMD - full (default) build --------------------------------------------
      getUMDConfig(
        pkg,
        name,
        'umd/index.ts',
        'dist-umd/min.js'
      ),

      // UMD - build with BasicEngine only -------------------------------------
      getUMDConfig(
        pkg,
        `${name}Basic`,
        'umd/index.basic.ts',
        'dist-umd/basic.min.js'
      ),

      // UMD - build with SeededEngine only ------------------------------------
      getUMDConfig(
        pkg,
        `${name}Seeded`,
        'umd/index.seeded.ts',
        'dist-umd/seeded.min.js'
      ),

      // UMD - build with CryptoEngine only ------------------------------------
      getUMDConfig(
        pkg,
        `${name}Crypto`,
        'umd/index.crypto.ts',
        'dist-umd/crypto.min.js'
      ),

      // UMD - core build without engines --------------------------------------
      getUMDConfig(
        pkg,
        `${name}Core`,
        'umd/index.core.ts',
        'dist-umd/core.min.js'
      ),
    ]
  }
}
