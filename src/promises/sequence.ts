export default async function sequenceP<A>(ps: Promise<A>[]): Promise<A[] | Error> {
  try {
    const results = [];
    for await (let p of ps) {
      results.push(p);
    }
    return results;
  } catch (err) {
    return err;
  }
}
