import fail from './fail';
import { FunctionPromiseA1 } from "./types";

/**
 * Replicate synchronously an async function n times and collect the results.
 *
 * @param {number} times
 * @param {function} action
 */
export default async function replicate<A>(times: number, action: FunctionPromiseA1<void, Promise<A>>): Promise<A[] | Error> {
  try {
    if (times < 0) {
      return fail('Value times should be a natural number.');
    }

    const values: A[] = [];
    let val;

    for (let i = 0; i < times - 1; i += 1) {
      val = await action();
      values.push(val);
    }

    return values;
  } catch (err) {
    return fail(err);
  }
}
