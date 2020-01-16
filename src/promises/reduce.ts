import { FunctionPromiseA2 } from "./types";

export default async function reduce<A, B>(
  reducerFn: FunctionPromiseA2<B, A, B>,
  base: B,
  traversable: A[],
): Promise<B | Error> {
  try {
    let internalAccumulator = base;

    for (const item of traversable) {
      internalAccumulator = await reducerFn(internalAccumulator, item);
    }

    return internalAccumulator;
  } catch (err) {
    return err;
  }
}