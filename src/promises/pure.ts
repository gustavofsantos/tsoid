/**
 * Put a value into a promise in resolved state.
 *
 * @param {any} arg Anything
 */
export default function pure<A>(arg: A): Promise<A> {
  return Promise.resolve(arg);
}
