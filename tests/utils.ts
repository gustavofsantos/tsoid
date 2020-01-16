export interface User {
  uid: string;
  name: string;
  email: string;
}

export async function getUser(uid: string): Promise<User> {
  return {
    uid,
    name: 'User Name',
    email: 'user@email.com',
  };
}

export async function getUserWithError(uid: string): Promise<User | Error> {
  throw new Error(`Error getting ${uid}`);
}

export async function getUsers(): Promise<User[]> {
  return [
    {
      uid: '01',
      name: 'User Name',
      email: 'user@email.com',
    },
    {
      uid: '02',
      name: 'User Name',
      email: 'user@email.com',
    },
    {
      uid: '03',
      name: 'User Name',
      email: 'user@email.com',
    },
  ];
}

export async function fetchData() {
  return {
    json() {
      return Promise.resolve({
        uid: 'abc',
        name: 'User Name',
        email: 'user@email.com',
      });
    },
  };
}
