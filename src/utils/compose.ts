import id from './id';
import { FunctionA1 } from '../types';

/**
 * Compose two or more function into one function.
 *
 * @param {function} fnl
 * @param {function[]} fns
 */
export default function compose<A>(fnl: FunctionA1<any, any>, ...fns: FunctionA1<A, any>[]) {
  const composed = fns.reduceRight(
    (composedFn, fn) => (value) => fn(composedFn(value)),
    id,
  );

  return (input: A) => fnl(composed(input));
}
