import { id } from '../../index';

describe('id', () => {
  it('Should return the argument', () => {
    expect(id(1)).toBe(1);
    expect(id(new Error(''))).toBeInstanceOf(Error);
  });
});
