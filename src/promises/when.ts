import fail from './fail';

/**
 * Execute the action function if the condition is true.
 *
 * @param {boolean} cond
 * @param {function} fn
 */
export default async function when<A>(cond: boolean, fn: () => Promise<A>): Promise<A | Error | undefined> {
  try {
    if (cond) {
      return await fn();
    }

    return undefined;
  } catch (err) {
    return fail(err);
  }
}
