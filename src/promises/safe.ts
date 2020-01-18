import { FunctionVar } from '../types';

/**
 * Safe is a function that executes an action inside a box, catching errors
 * and returning a promise of the value or the error catched.
 *
 * @param action
 * @param args
 */
export default async function safe<R>(action: FunctionVar<Promise<R>>, ...args: any[]) {
  try {
    return await action(...args);
  } catch (err) {
    if (err instanceof Error) {
      return err;
    }
    if (typeof err === 'string') {
      return new Error(err);
    }
    return err;
  }
}
