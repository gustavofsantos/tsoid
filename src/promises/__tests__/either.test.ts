import { either } from '../../index';

describe('either', () => {
  const successCallback = jest.fn((n: number) => n + 1);
  const errorCallback = jest.fn(() => 9);

  it('Should call the success callback', async () => {
    const action = () => Promise.resolve(0);

    const res = await either(successCallback, errorCallback, action);
    expect(res).toBe(1);
  });

  it('Should call the error callback', async () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    const action = () => Promise.reject(new Error('Some error'));

    const res = await either(successCallback, errorCallback, action);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Some error');
  });

  it('Should call the error callback if the action resolves to an Error', async () => {
    const action = () => Promise.resolve(new Error('Some error'));

    const res = await either(successCallback, errorCallback, action);
    expect(res).toBe(9);
  });
});
