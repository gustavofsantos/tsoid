/**
 * Returns a promise that resolves to an error.
 *
 * @param err Error instance or reason
 */
export default function fail(err: Error | string): Promise<Error> {
  if (err instanceof Error) {
    return Promise.resolve(err);
  }

  return Promise.resolve(new Error(err));
}