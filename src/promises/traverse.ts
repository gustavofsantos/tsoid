import fail from './fail';
import { FunctionPromiseA1 } from './types';

/**
 *
 * @param fn
 * @param list
 */
export default async function traverse<A, B>(fn: FunctionPromiseA1<A, B>, list: A[]): Promise<B[] | Error> {
  const results: B[] = [];

  try {
    for (let elem of list) {
      const result = await fn(elem);
      results.push(result);
    }

    return results;
  } catch (err) {
    return fail(err);
  }
}
