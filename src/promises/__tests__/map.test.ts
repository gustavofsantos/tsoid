import mapP from "../map";

describe('mapP', () => {
  it('Should map over future values', () => {
    const ls = [ 1, 2, 3 ];

    const add1P = (x: number) => Promise.resolve(x + 1);

    const result = mapP(add1P, ls);

    result.then(values => expect(values).toStrictEqual([2, 3, 4]));
  })
});
