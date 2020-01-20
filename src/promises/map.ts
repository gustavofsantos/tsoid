import { FunctionPromiseA1 } from "./types";

export default async function map<A, B>(fn: FunctionPromiseA1<A, B>, traversable: A[]): Promise<B[] | Error> {
  try {
    const results = [];
    
    for (let item of traversable) {
      const result = await fn(item);
      results.push(result);
    }

    return results;
  } catch (err) {
    return err;
  }
}