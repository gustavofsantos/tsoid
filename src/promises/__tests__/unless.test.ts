import { unless } from '../../index';

describe('unless', () => {
  const action = jest.fn(() => Promise.resolve(''));

  it('Should call the action if false', async () => {
    await unless(false, action);
    expect(action).toBeCalledTimes(1);
  });

  it('Should not call the action when true', async () => {
    await unless(true, action);
    expect(action).toBeCalledTimes(0);
  });
});
