import { liftP2 } from "../lift";

describe('liftP2', () => {
  const add = (x: number, y: number) => x + y;

  it('Should lift a function with 2-arity into two promises', () => {
    const getTen = () => Promise.resolve(10);
    const getSeven = () => Promise.resolve(7);

    const result = liftP2(add, getTen(), getSeven());

    result.then(value => {
      expect(value).toBe(17);
    });
  })
});
