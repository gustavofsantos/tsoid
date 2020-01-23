import fail from './fail';
import { FunctionPromiseA1 } from './types';

/**
 * Bind is a transient function that takes an initial promise and resolves it,
 * the value of the promise will be passed as argument to the first action,
 * then the resolved result of the first action will be passed as argument
 * to the second action and so on.
 *
 * The value of the last action will be returned.
 *
 * @param {Promise} p
 * @param {function[]} fns
 */
export default async function bind<A>(p: Promise<A>, ...fns: FunctionPromiseA1<any, any>[]): Promise<unknown> {
  try {
    const initialValueResolved = await p;
    let finalResult = undefined;
    let index = 0;

    for (let fn of fns) {
      finalResult = await fn(index === 0 ? initialValueResolved : finalResult);
      index += 1;
    }

    return finalResult;
  } catch (err) {
    return fail(err);
  }
}
