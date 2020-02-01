import { when } from '../../index';

describe('when', () => {
  const action = jest.fn(() => Promise.resolve(''));
  it('Should call the action if true', async () => {
    await when(true, action);
    expect(action).toBeCalledTimes(1);
  });

  it('Should not call the action when false', async () => {
    await when(false, action);
    expect(action).toBeCalledTimes(0);
  });
});
