// @flow

import request from 'supertest';
import server from '../src/server';
import { setupDatabase, authenticate } from './utils';

const check = done => (err, res) => (err ? done.fail(err) : done());
let token;

beforeAll(async () => {
  await setupDatabase();
  token = await authenticate(request(server.listen()), {
    email: 'john.doe@example.com',
    password: 'johndoe',
  });

  // TODO: should really set the request to pre-authorized state, and have tests
  // use them instead
});

describe('POST /graphql', () => {
  test('should return 401 for unauthenticated requests', done => {
    request(server.listen()).get('/graphql').expect(401, check(done));
    request(server.listen()).get('/graphql/schema').expect(401, check(done));
  });

  test('should return 200 when asked for /schema', done => {
    request(server.listen())
      .get('/graphql/schema')
      .set('Authorization', `Bearer ${token}`)
      .expect(200, check(done));
  });

  test('should return 400 if not query is sent', done => {
    request(server.listen())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .expect(400, check(done));
  });
});
