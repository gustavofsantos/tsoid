import fail from './fail';
import { FunctionA1 } from '../types';

/**
 * Process a sequence of promises synchronously and return a promise that resolves to
 * an array of results.
 *
 * @param {Promise[]} ps
 */
export default async function sequence<A>(ps: FunctionA1<void, Promise<A>>[]): Promise<A[] | Error> {
  try {
    const results = [];

    for await (const p of ps) {
      const res = await p();
      if (res instanceof Error) return fail(res);

      results.push(res);
    }
    return results;
  } catch (err) {
    return fail(err);
  }
}
