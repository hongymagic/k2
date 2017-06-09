const bcrypt = require('bcrypt');
const uuid = require('uuid');

const table = 'users';
const users = [
  { email: 'john.doe@example.com', name: 'John Doe', password: 'johndoe' },
  { email: 'jane.doe@example.com', name: 'Jane Doe', password: 'janedoe' },
];

module.exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const rows = await knex(table).del();
  console.log(`${rows} deleted from ${table}`);
  return knex(table).insert(
    users.map(
      ({ name, email, password }) => ({
        id: uuid(),
        name,
        email,
        email_confirmed: true,
        password_hash: bcrypt.hashSync(password, 10),
        email_confirmed: true,
      })
    )
  );
};
