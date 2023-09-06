
// common engine shorthands
export { default as BasicEngine } from './MathRandomEngine'
export { default as SeededEngine } from './MT19937Engine'
export { default as CryptoEngine } from './CrossCryptoEngine'

// the default engine is a seedable engine
export { default as DefaultEngine } from './MT19937Engine'
