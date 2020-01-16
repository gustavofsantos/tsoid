import { FunctionPromiseA1 } from "./types";

export default function map<A, B>(fn: FunctionPromiseA1<A, B>, traversable: A[]): Promise<B[] | Error> {
  try {
    return Promise.all<B>(traversable.map(fn));
  } catch (err) {
    return err;
  }
}