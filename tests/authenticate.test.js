import request from 'supertest';
import server from '../src/server';
import { setupDatabase } from './utils';

const check = done => (err, res) => (err ? done.fail(err) : done());

beforeAll(setupDatabase);

describe('POST /authenticate', () => {
  test('should throw 401 is credentials are incorrect', done => {
    request(server.listen())
      .post('/authenticate')
      .send({
        // If these aren't unique enough, then wtf. Change it yourself.
        email: `user-${(Math.random() * 1000000) | 0}`,
        password: `password-${(Math.random() * 1000000) | 0}`,
      })
      // Note that examples on supertest website uses mocha which has a
      // slightly different implmentation of callback fn `done` to jasmine.
      .expect(401, check(done));
  });

  test('should give me a token if credentials are valid', done => {
    request(server.listen())
      .post('/authenticate')
      .send({
        email: 'john.doe@example.com',
        password: 'johndoe',
      })
      .expect(200, check(done));
  });
});
