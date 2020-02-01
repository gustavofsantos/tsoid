import { pure } from '../../index';

describe('pure', () => {
  it('Should pure(number) return Promise<number>', () => {
    const res = pure(10);

    res.then((value) => expect(value).toBe(10));
  });
});
