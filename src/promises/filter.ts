import { FunctionA1 } from "../types";

export default async function filter<A>(predP: FunctionA1<A, Promise<boolean>>, traversable: A[]): Promise<A[] | Error> {
  try {
    const result: A[] = [];

    traversable.forEach((item) => {
      predP(item)
        .then((value) => {
          if (value) {
            result.push(item);
          }
        });
    });

    return result;
  } catch (err) {
    return err;
  }
}