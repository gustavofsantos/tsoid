import fail from './fail';
import { FunctionPromiseA2 } from "./types";

/**
 * Reduce an array of elements into a value, based in an async reducer function.
 *
 * @param {function} reducerFn
 * @param {any} base
 * @param {any[]} traversable
 */
export default async function reduce<A, B>(
  reducerFn: FunctionPromiseA2<B, A, B>,
  base: B,
  traversable: A[],
): Promise<B | Error> {
  try {
    let internalAccumulator = base;

    for (const item of traversable) {
      internalAccumulator = await reducerFn(internalAccumulator, item);
    }

    return internalAccumulator;
  } catch (err) {
    return fail(err);
  }
}
