export default async function when<A>(cond: boolean, fn: () => Promise<A>): Promise<A | Error | undefined> {
  try {
    if (cond) {
      return await fn();
    }

    return undefined;
  } catch (err) {
    return err;
  }
}