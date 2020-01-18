import { FunctionVar } from '../types';

export default function withLog<A>(fn: FunctionVar<A>) {
  return function loggerFn(...args: any[]) {
    const name = fn.name;
    const result = fn(...args);

    console.log((name || 'anonymous') + '(' + args + ') = ' + result);
    return result;
  }
}
