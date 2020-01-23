import when from "./when";

/**
 * Execution the action function if the condition was false.
 *
 * @param {boolean} cond
 * @param {function} fn
 */
export default function unless<A>(cond: boolean, fn: () => Promise<A>): Promise<A | Error | undefined> {
  return when(!cond, fn);
}
