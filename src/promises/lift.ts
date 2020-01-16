import either from "./either";
import id from "../utils/id";
import { FunctionA3, FunctionA2, FunctionA1 } from "../types";

export default async function liftP<A, B>(fn: FunctionA1<A, B>, pa: Promise<A | Error>): Promise<B | Error> {
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
export async function liftP2<A, B, C>(fn: FunctionA2<A, B, C>, pa: Promise<A>, pb: Promise<B>): Promise<C | Error> {
  try {
    const resA = await pa;
    const resB = await pb;
    return fn(resA, resB);
  } catch (err) {
    return err;
  }
}

export async function liftP3<A, B, C, D>(
  fn: FunctionA3<A, B, C, D>,
  pa: Promise<A>,
  pb: Promise<B>,
  pc: Promise<C>,
): Promise<D | Error> {
  try {
    const resA = await pa;
    const resB = await pb;
    const resC = await pc;
    return fn(resA, resB, resC);
  } catch (err) {
    return err;
  }
}
