import when from "./when";

export default function unless<A>(cond: boolean, fn: () => Promise<A>): Promise<A | Error | undefined> {
  return when(!cond, fn);
}