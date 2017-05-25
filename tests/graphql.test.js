// @flow

import request from 'supertest';
import server from '../src/server';

const check = done => (err, res) => (err ? done.fail(err) : done());

describe('POST /graphql', () => {
  test('should return 200 when asked for /schema', done => {
    request(server.listen()).get('/graphql/schema').expect(200, check(done));
  });

  test('should return 400 if not query is sent', done => {
    request(server.listen()).post('/graphql').expect(400, check(done));
  });
});
