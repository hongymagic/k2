require('dotenv').config();

// Default to use sqlite3 database and store the db file in git. sqlite3's file
// based db makes it easier to deploy to cloud services such as now.sh or heroku
// without setting up external database(s). If you wish to change this default
// behaviour, you must provide and setup your own database elsewhere.
//
// See below for postgresql example (use it with provided docker-compose.yml).
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './sqlite3/k2.db',
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'migrations',
  },
};

// The following configuration is setup to prefer AWS RDS connection information
// which is used in Elastic Beanstalk; otherwise it will require you to setup
// custom database environment variables either via .env file or by explicitly
// adding them to the environment before starting up the server.

// Uncomment the below lines to use postgres.
//module.exports = {
//  client: 'pg',
//  connection: {
//    host: process.env.RDS_HOSTNAME || process.env.DB_HOSTNAME || 'localhost',
//    database: process.env.RDS_DB_NAME || process.env.DB_NAME || process.env.NODE_ENV || 'development',
//    user: process.env.RDS_USERNAME || process.env.DB_USERNAME || 'postgres',
//    password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD || '',
//  },
//  migrations: {
//    tableName: 'migrations',
//  },
//};
