import { FunctionPromiseA1 } from "./types";

export default async function replicate<A>(times: number, action: FunctionPromiseA1<void, Promise<A>>): Promise<A[] | Error> {
  try {
    if (times < 0) {
      return new Error('Value times should be a natural number.');
    }

    const values: A[] = [];
    let val;

    for (let i = 0; i < times - 1; i += 1) {
      val = await action();
      values.push(val);
    }

    return values;
  } catch (err) {
    return err;
  }
}