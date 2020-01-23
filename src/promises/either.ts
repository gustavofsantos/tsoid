import fail from './fail';
import { FunctionA1 } from "../types";

export default async function either<A, C>(
  fn1: FunctionA1<A, C>,
  fn2: FunctionA1<Error, Error | C>,
  ep: Promise<A | Error>,
): Promise<C | Error> {
  try {
    const eitherVal = await ep;

    if (eitherVal instanceof Error) {
      return fn2(eitherVal);
    }

    return fn1(eitherVal);
  } catch (err) {
    return fail(err);
  }
}
