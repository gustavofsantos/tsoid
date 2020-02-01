import fail from './fail';
import { FunctionA1 } from '../types';

/**
 * Resolves the action and call the success callback in case of success or
 * calls the error callback in case of error, returning the result of
 * the success or error callback.
 *
 * @param {function} fn1 Success callback
 * @param {function} fn2 Error callback
 * @param {function} ep
 */
export default async function either<A, C>(
  fn1: FunctionA1<A, C>,
  fn2: FunctionA1<Error, Error | C>,
  ep: FunctionA1<void, Promise<A | Error>>,
): Promise<C | Error> {
  try {
    const eitherVal = await ep();

    if (eitherVal instanceof Error) {
      return fn2(eitherVal);
    }

    return fn1(eitherVal);
  } catch (err) {
    return fail(err);
  }
}
