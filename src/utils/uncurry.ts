import { FunctionCurriedA2, FunctionCurriedA3, FunctionCurriedA4 } from '../types';

export default function uncurry<A, B, C>(fn: FunctionCurriedA2<A, B, C>) {
  return function uncurriedFn(arg0: A, arg1: B) {
    return fn(arg0)(arg1);
  }
}

export function uncurry3<A, B, C, D>(fn: FunctionCurriedA3<A, B, C, D>) {
  return function uncurriedFn(arg0: A, arg1: B, arg2: C) {
    return fn(arg0)(arg1)(arg2);
  }
}

export function uncurry4<A, B, C, D, E>(fn: FunctionCurriedA4<A, B, C, D, E>) {
  return function uncurriedFn(arg0: A, arg1: B, arg2: C, arg3: D) {
    return fn(arg0)(arg1)(arg2)(arg3);
  }
}
