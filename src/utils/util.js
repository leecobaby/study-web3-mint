/**
 * Throttles the given function to be called at most once per `delay` milliseconds.
 * @param {Function} fn - The function to be throttled.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - The throttled function.
 */
export function throttle(fn, delay) {
  let timer
  return function () {
    if (!timer) {
      fn.apply(this, arguments)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}
