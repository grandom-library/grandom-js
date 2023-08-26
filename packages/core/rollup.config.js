const typescript = require('@rollup/plugin-typescript')

const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

if (!version) {
  throw new Error(`Invalid version, got: "${version}".`)
}

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: 'src/index.ts',

  output: {
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    dir: 'dist'
  },

  plugins: [
    typescript()
  ]
}
