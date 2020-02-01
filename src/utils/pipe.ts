import id from './id';
import { FunctionA1 } from '../types';

/**
 * Create a new function that represents all the functions piped
 *
 * @param {function} fn1
 * @param {function[]} fns
 */
export default function pipe<A>(fn1: FunctionA1<A, any>, ...fns: FunctionA1<any, any>[]) {
  const piped = fns.reduce(
    (pipedFn, fn) => (value: unknown) => fn(pipedFn(value)),
    id,
  );

  return (input: A) => piped(fn1(input));
}
