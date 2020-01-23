import fail from './fail';
import { FunctionPromiseA1 } from "./types";

/**
 * Apply the mapper action function to each element of the traversable collection,
 * resolving the results synchronously.
 *
 * @param {function} fn Action function
 * @param {any[]} traversable Array of items
 */
export default async function map<A, B>(fn: FunctionPromiseA1<A, B>, traversable: A[]): Promise<B[] | Error> {
  try {
    const results = [];

    for (let item of traversable) {
      const result = await fn(item);
      results.push(result);
    }

    return results;
  } catch (err) {
    return fail(err);
  }
}
