// @flow

import knex from 'knex';
import Client from 'knex/lib/dialects/postgres';
import Formatter from 'knex/lib/formatter';
import knexConfig from '../knexfile';

// Pull database connection configuration from knexfile.
const { connection } = knexConfig;

// Converts "camelCase" strings to "snake_case"
const toSnakeCase = (cache => (key: string) => {
  let snakeCaseKey = cache.get(key);
  if (!snakeCaseKey) {
    snakeCaseKey = key.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`);
    cache.set(key, snakeCaseKey);
  }
  return snakeCaseKey;
})(new Map());

// Automatically convert "camelCase" identifiers to "snake_case". For example:
//   db.table('users').where('userId', '=', 1).update({ firstName: 'Bill' })
//   => UPDATE "users" SET "first_name" = ? WHERE "user_id" = ?
Client.prototype.wrapIdentifier = value => {
  if (value === '*') return value;
  const matched = value.match(/(.*?)(\[[0-9]\])/);
  if (matched)
    return (
      Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2]
    );
  return `"${toSnakeCase(value).replace(/"/g, '""')}"`;
};

// The above should not apply to the "as <name>" identifiers. For example:
// db.table('users').select('user_id as userId') => SELECT "user_id" as "userId" from "users"
Formatter.prototype.wrapAsIdentifier = value =>
  `"${(value || '').replace(/"/g, '""')}"`;

const config: Object = {
  acquireConnectionTimeout: process.env.NODE_ENV === 'production'
    ? 60000
    : 1000,
  pool: process.env.NODE_ENV === 'production'
    ? { min: 2, max: 10 }
    : { min: 0, max: 1 },
  debug: process.env.DATABASE_DEBUG === 'true',
};
const db = knex(
  Object.assign(
    {},
    {
      client: Client,
      connection,
      migrations: {
        tableName: 'migrations',
      },
    },
    config
  )
);

export default db;
