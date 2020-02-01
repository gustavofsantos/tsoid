import either from './either';
import id from '../utils/id';
import fail from './fail';
import {
  FunctionA3, FunctionA2, FunctionA1, FunctionVar,
} from '../types';

export default async function liftP<A, B>(
  fn: FunctionA1<A, B>,
  pa: FunctionA1<void, Promise<A | Error>>,
): Promise<B | Error> {
  return either(fn, id, pa);
}

/**
 * Lift a 2-arity function to the promise execution and returns a new
 * promise with the final result
 *
 * @param fn
 * @param pa
 * @param pb
 */
export async function liftP2<A, B, C>(
  fn: FunctionA2<A, B, C>,
  pa: FunctionA1<void, Promise<A>>,
  pb: FunctionA1<void, Promise<B>>,
): Promise<C | Error> {
  try {
    const resA = await pa();
    if (resA instanceof Error) return fail(resA);
    const resB = await pb();
    if (resB instanceof Error) return fail(resB);

    return fn(resA, resB);
  } catch (err) {
    return fail(err);
  }
}

export async function liftP3<A, B, C, D>(
  fn: FunctionA3<A, B, C, D>,
  pa: FunctionA1<void, Promise<A>>,
  pb: FunctionA1<void, Promise<B>>,
  pc: FunctionA1<void, Promise<C>>,
): Promise<D | Error> {
  try {
    const resA = await pa();
    if (resA instanceof Error) return fail(resA);
    const resB = await pb();
    if (resB instanceof Error) return fail(resB);
    const resC = await pc();
    if (resC instanceof Error) return fail(resC);

    return fn(resA, resB, resC);
  } catch (err) {
    return fail(err);
  }
}

export async function liftPN(
  fn: FunctionVar<unknown>,
  ...ps: FunctionA1<void, Promise<any>>[]
): Promise<unknown | Error> {
  try {
    const results = [];

    for (const p of ps) {
      const result = await p();
      if (result instanceof Error) {
        return fail(result);
      }
      results.push(result);
    }

    return fn(...results);
  } catch (err) {
    return fail(err);
  }
}
