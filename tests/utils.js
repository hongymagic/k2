// @flow

import db from '../src/db';

export const setupDatabase = () =>
  db.migrate.latest().then(() => db.seed.run());

export const authenticate = async (
  agent: any,
  login: {| email: string, password: string |}
) => {
  const response = await agent
    .post('/authenticate')
    .set('Accept', 'application/json')
    .send(login);

  return response.text;
};
