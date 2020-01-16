export default function fail(reason: string): Promise<Error> {
  return Promise.resolve(new Error(reason));
}