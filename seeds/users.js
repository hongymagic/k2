const bcrypt = require('bcrypt');

const table = 'users';
const users = [
  { email: 'demo@cba.com.au',       name: 'John Doe',   password: 'P@55w0rd!' },
  { email: 'david.hong@cba.com.au', name: 'David Hong', password: 'password' },
];

module.exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert(
    users.map(
      ({ name, email, password }) => ({
        name,
        email,
        password_hash: bcrypt.hashSync(password, 10),
        email_confirmed: true,
      })
    )
  );
};
