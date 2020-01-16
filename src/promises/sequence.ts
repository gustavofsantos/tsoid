export default function sequenceP<A>(ps: Promise<A>[]): Promise<A[] | Error> {
  try {
    return Promise.all(ps);
  } catch (err) {
    return err;
  }
}
