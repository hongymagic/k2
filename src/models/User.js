// @flow

import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import db from '../db';

const fields = [
  'id',
  'email',
  'name',
];

class User {
  id: string;
  email: string;
  name: string;

  constructor(props: Object) {
    Object.assign(this, props);
  }

  verify(password: string): boolean {
    if (!this.password_hash) {
      return false;
    }

    return compareSync(password, this.password_hash);
  }

  token(): string {
    return sign(this, process.env.APP_SECRET, {
      expiresIn: 60 * 60 * 2 /* hours */
    });
  }

  static async find(...args) {
    return db.table('users')
      .where(...(args.length ? args : [{}]))
      .select(...fields)
      .then(rows => rows.map(x => new User(x)));
  }

  static async findByIds(ids: string[]): Promise<User[]> {
    return db.table('users')
      .whereIn('id', ids)
      .then(rows => ids.map((id) => {
        const row = rows.find(x => x.id === id);
        return row && new User(row);
      }));
  }

  static findOne(...args): Promise<User> {
    return db.table('users')
      .where(...(args.length ? args : [{}]))
      .first()
      .then(x => x && new User(x));
  }

  static any(...args): boolean {
    return db.raw('SELECT EXISTS ?', db.table('users').where(...(args.length ? args : [{}])).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  static create(user) {
    return db.table('users')
      .insert(user, fields).then(x => new User(x[0]));
  }
}

export default User;
