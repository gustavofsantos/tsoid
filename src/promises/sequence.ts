import fail from './fail';

/**
 * Process a sequence of promises synchronously and return a promise that resolves to
 * an array of results.
 *
 * @param {Promise[]} ps
 */
export default async function sequenceP<A>(ps: Promise<A>[]): Promise<A[] | Error> {
  try {
    const results = [];
    for await (let p of ps) {
      results.push(p);
    }
    return results;
  } catch (err) {
    return fail(err);
  }
}
