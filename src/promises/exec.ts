import fail from './fail';
import { FunctionPromiseA1 } from './types';

/**
 * Exec will execute all the actions synchronously and return nothing.
 * If any action throws any error, it will be propagated to the caller.
 *
 * @param {function[]} fns
 */
export default async function exec(...fns: FunctionPromiseA1<void, any>[]): Promise<void | Error> {
  try {
    for (const fn of fns) {
      await fn();
    }
    return;
  } catch (err) {
    // eslint-disable-next-line consistent-return
    return fail(err);
  }
}
