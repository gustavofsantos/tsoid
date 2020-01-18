import { FunctionA2, FunctionA3, FunctionA4 } from '../types';

export default function curry<A, B, C>(fn: FunctionA2<A, B, C>) {
  return function curriedA(arg0: A) {
    return function curriedB(arg1: B) {
      return fn(arg0, arg1);
    }
  }
}

export function curry3<A, B, C, D>(fn: FunctionA3<A, B, C, D>) {
  return function curriedA(arg0: A) {
    return function curriedB(arg1: B) {
      return function curriedC(arg2: C) {
        return fn(arg0, arg1, arg2);
      }
    }
  }
}

export function curry4<A, B, C, D, E>(fn: FunctionA4<A, B, C, D, E>) {
  return function curriedA(arg0: A) {
    return function curriedB(arg1: B) {
      return function curriedC(arg2: C) {
        return function curriedD(arg3: D) {
          return fn(arg0, arg1, arg2, arg3);
        }
      }
    }
  }
}
