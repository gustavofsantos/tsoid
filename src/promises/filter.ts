import fail from './fail';
import { FunctionA1 } from '../types';

export default async function filter<A>(
  predP: FunctionA1<A, Promise<boolean>>,
  traversable: A[],
): Promise<A[] | Error> {
  try {
    const results: A[] = [];

    for (const item of traversable) {
      const result = await predP(item);
      if (result) {
        results.push(item);
      }
    }

    return results;
  } catch (err) {
    return fail(err);
  }
}
