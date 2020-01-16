export default function pure<A>(arg: A): Promise<A> {
  return Promise.resolve(arg);
}