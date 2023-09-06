export const getRest = (_: any, arg2?: any, arg3?: any): {
  count: number
  options: Record<string, any>
} => {
  let count = -1
  let options: Record<string, any> = {}

  if (typeof arg2 !== 'undefined') {
    if (typeof arg2 === 'number') {
      count = arg2

      // NaN check and bound checks
      // eslint-disable-next-line no-self-compare
      if (count !== count || count < 1 || count > Number.MAX_SAFE_INTEGER) {
        throw new RangeError(
          `Count must be >= 1 and <= Number.MAX_SAFE_INTEGER, got: ${count}.`
        )
      }
    } else if (typeof arg2 === 'object' && arg2 !== null) {
      options = arg2
    } else {
      throw new TypeError(
        '2nd argument must be a number (count), or an object (options), ' +
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `got: ${arg2} (typeof === '${typeof arg2}').`
      )
    }

    if (typeof arg3 !== 'undefined') {
      if (typeof arg3 === 'object' && arg3 !== null) {
        options = arg3
      } else {
        throw new TypeError(
          '3rd argument must be an object (options), ' +
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `got: ${arg3} (typeof === '${typeof arg3}').`
        )
      }
    }
  }

  return {
    count,
    options
  }
}
