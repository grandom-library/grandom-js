#!/usr/bin/env bash

# update package.jsons
npx --no-install lerna exec \
  --concurrency 1 -- \
  npx --yes npm-check-updates -u \"/^@grandom.*$/\"

# install updated deps
npx --no-install lerna exec \
  npm i
