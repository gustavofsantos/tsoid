import { FunctionPromiseA1 } from './types';

export default async function flatMap<A, B>(p: Promise<A>, fn: FunctionPromiseA1<A, B>): Promise<B> {
  try {
    const resolved = await p;
    return await fn(resolved);
  } catch (err) {
    throw err;
  }
}
