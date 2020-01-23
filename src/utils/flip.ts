import { FunctionA2, FunctionA3, FunctionA4 } from '../types';

/**
 * Flip arguments of the given function
 *
 * @param {function} fn
 */
export default function flip<A, B, C>(fn: FunctionA2<A, B, C>) {
  return function flippedFn(arg0: B, arg1: A) {
    return fn(arg1, arg0);
  }
}

/**
 * Flip arguments of the given function
 *
 * @param {function} fn
 */
export function flip3<A, B, C, D>(fn: FunctionA3<A, B, C, D>) {
  return function flippedFn(arg0: C, arg1: B, arg2: A) {
    return fn(arg2, arg1, arg0);
  }
}

/**
 * Flip arguments of the given function
 *
 * @param {function} fn
 */
export function flip4<A, B, C, D, E>(fn: FunctionA4<A, B, C, D, E>) {
  return function flippedFn(arg0: D, arg1: C, arg2: B, arg3: A) {
    return fn(arg3, arg2, arg1, arg0);
  }
}
