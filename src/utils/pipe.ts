import id from "./id";
import { FunctionA1 } from "../types";


export default function pipe<A>(fn1: FunctionA1<A, any>, ...fns: FunctionA1<any, any>[]) {
  const piped = fns.reduce(
    (pipedFn, fn) => (value: unknown) => fn(pipedFn(value)),
    id,
  );

  return (input: A) => piped(fn1(input));
}