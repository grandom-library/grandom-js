const dedent = require('string-dedent')

const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

if (!version) {
  throw new Error(`Invalid version, got: "${version}".`)
}

module.exports = (pkg) => {
  return {
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
  }
}
