import { FunctionPromiseA1 } from './types';

export default async function traverse<A, B>(fn: FunctionPromiseA1<A, B>, list: A[]): Promise<B[]> {
  const results: B[] = [];

  try {
    for (let elem of list) {
      const result = await fn(elem);
      results.push(result);
    }

    return results;
  } catch (err) {
    return fail(err.message);
  }
}
