import fail from './fail';
import { FunctionPromiseA1 } from './types';
import { FunctionA1 } from '../types';

/**
 * Flats a promise into a value and apply the function fn to the resolved function,
 * then resolves the result of calling fn applied to the result of p.
 *
 * @param {Promise} p
 * @param {function} fn
 */
export default async function flatMap<A, B>(
  p: FunctionA1<void, Promise<A>>,
  fn: FunctionPromiseA1<A, B>,
): Promise<B | Error> {
  try {
    const resolved = await p();
    return await fn(resolved);
  } catch (err) {
    return fail(err);
  }
}
