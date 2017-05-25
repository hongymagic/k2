require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.RDS_HOSTNAME || process.env.DB_HOSTNAME || 'localhost',
    database: process.env.RDS_DB_NAME || process.env.DB_NAME || process.env.NODE_ENV || 'development',
    user: process.env.RDS_USERNAME || process.env.DB_USERNAME || 'postgres',
    password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD || '',
  },
};
