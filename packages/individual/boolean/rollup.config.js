const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const size = require('rollup-plugin-filesize')

const banner = require('utils/build/banner')
const pkg = require('./package.json')

const baseUMDConfig = {
  output: {
    format: 'umd',
    sourcemap: true,
    ...banner(pkg)
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

/** @type {import('rollup').RollupOptions} */
module.exports = [
  // CommonJS build ------------------------------------------------------------
  {
    input: 'src/index.ts',

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
  },
  // UMD - full (default) build - minimized ------------------------------------
  {
    input: 'umd/index.ts',

    output: {
      ...baseUMDConfig.output,
      file: 'dist-umd/min.js',
      name: 'grandomBoolean'
    },

    ...baseUMDConfig.plugins
  },
  // UMD - basic build - minimized ---------------------------------------------
  {
    input: 'umd/index.basic.ts',

    output: {
      ...baseUMDConfig.output,
      file: 'dist-umd/basic.min.js',
      name: 'grandomBooleanBasic'
    },

    ...baseUMDConfig.plugins
  },
  // UMD - seedable build - minimized ------------------------------------------
  {
    input: 'umd/index.seedable.ts',

    output: {
      ...baseUMDConfig.output,
      file: 'dist-umd/seedable.min.js',
      name: 'grandomBooleanSeedable'
    },

    ...baseUMDConfig.plugins
  },
  // UMD - crypto build - minimized --------------------------------------------
  {
    input: 'umd/index.crypto.ts',

    output: {
      ...baseUMDConfig.output,
      file: 'dist-umd/crypto.min.js',
      name: 'grandomBooleanCrypto'
    },

    ...baseUMDConfig.plugins
  },
  // UMD - core build - minimized ----------------------------------------------
  {
    input: 'umd/index.core.ts',

    output: {
      ...baseUMDConfig.output,
      file: 'dist-umd/core.min.js',
      name: 'grandomBooleanCore'
    },

    ...baseUMDConfig.plugins
  }
]
