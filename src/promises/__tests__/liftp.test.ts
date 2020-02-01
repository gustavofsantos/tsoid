import liftP from '../lift';
import {
  getUser, getUsers, getUserWithError, User,
} from '../../../tests/utils';
import { compose, pipe } from '../../index';

describe('liftP', () => {
  const addOne = (x: number) => x + 1;
  const getUserID = (user: User) => user.uid;
  const filterEvens = (users: User[]) => users.filter((_, index) => index % 2 === 0);
  const mapID = (users: User[]) => users.map((user) => user.uid);
  const joinIds = (ids: string[]) => ids.join(' -> ');

  it('Should lift a function into a promise', () => {
    const px = () => Promise.resolve(1);

    const result = liftP(addOne, px);

    result.then((value) => expect(value).toBe(2));
  });

  it('Lift a function that get the user id from Promise<User>', async () => {
    const uid = await liftP(getUserID, () => getUser('123'));

    expect(uid).toBe('123');
  });

  it('Should handle promise failure', async () => {
    const uid = await liftP(getUserID, () => getUserWithError('123'));

    expect(uid).toBeInstanceOf(Error);
    expect((uid as Error).message).toBe('Error getting 123');
  });

  it('Should return a promise of an error if any error occur when lifting', () => {
    const maybeGetTen = () => Promise.reject(new Error('reason test'));

    const result = liftP(addOne, maybeGetTen);

    result.catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  it('Should lift a composed function', async () => {
    const composedFn = compose(joinIds, mapID, filterEvens);

    const result = await liftP(composedFn, getUsers);
    expect(result).toBe('01 -> 03');
  });

  it('Should lift a piped function', async () => {
    const pipedFn = pipe(filterEvens, mapID, joinIds);

    const result = await liftP(pipedFn, getUsers);
    expect(result).toBe('01 -> 03');
  });
});
