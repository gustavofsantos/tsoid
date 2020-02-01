import { FunctionVar } from '../types';

export default function withLog<A>(fn: FunctionVar<A>) {
  return function loggerFn(...args: any[]) {
    const { name } = fn;
    const result = fn(...args);

    // eslint-disable-next-line no-console
    console.log(`${name || 'anonymous'}(${args}) = ${result}`);
    return result;
  };
}
