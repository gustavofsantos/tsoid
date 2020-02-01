import fail from './fail';
import { FunctionPromiseA1 } from './types';

/**
 * Traverse is like the map function, but with the arguments flipped.
 *
 * @param {function} fn
 * @param {any[]} list
 */
export default async function traverse<A, B>(list: A[], fn: FunctionPromiseA1<A, B>): Promise<B[] | Error> {
  const results: B[] = [];

  try {
    for (const elem of list) {
      const result = await fn(elem);

      if (result instanceof Error) {
        return fail(result);
      }

      results.push(result);
    }

    return results;
  } catch (err) {
    return fail(err);
  }
}
