![K2](https://gist.githubusercontent.com/hongymagic/44b775944afd136e2cafbde8868b7df2/raw/3edeb106a828b538808ecb7252112a5fedf62da9/logo.png)

# K2

[![Build Status](https://travis-ci.org/hongymagic/k2.svg?branch=master)](https://travis-ci.org/hongymagic/k2) [![codecov](https://codecov.io/gh/hongymagic/k2/branch/master/graph/badge.svg)](https://codecov.io/gh/hongymagic/k2) ![Package dependencies](https://david-dm.org/hongymagic/k2.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b01ca9655eb54672910339f7f653ad93)](https://www.codacy.com/app/hongymagic-github/k2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hongymagic/k2&amp;utm_campaign=Badge_Grade)

Koa 2 and GraphQL server that _just works™_. We've climbed the mountain of
boilerplate for you, so you don't have to.

## Included…

- [koa2](http://koajs.com) - write stuff in middleware
- [babel](http://babeljs.io) - use latest ES6/7 features today. why wait?
- [passport.js](http://passportjs.org) - easy authentication
- [knex.js](http://knexjs.org) - documentation is better than sequelize
- [GraphQL](http://graphql.org) - it's the way to go
- [Jest](https://facebook.github.io/jest/) - don't let tests get in your way
- [ramda](http://ramdajs.com) - please don't use lodash or underscore
- [prettier](https://prettier.github.io/prettier/) - don't worry about formatting…
- [flowtype](https://flow.org) - get your types right

## Getting started

Make sure you have Docker installed as PostgreSQL is run on the docker
container.

```
git clone -o k2 -b master --single-branch https://github.com/hongymagic/k2.git example-api

cd example-api                  # Change current directory to the newly created one
yarn install                    # Install required packages via yarn
cp .env.sample .env             # Configuration on development mode is done via dotenv
yarn migrate:latest             # Run database migrations
yarn seed:run                   # Add some seed data
yarn start:dev                  # Start the server in development mode
```

By default the API server starts on port 5000, http://localhost:5000.

## Structure

```
┌── .env.sample                 # Sample .env file loaded into process.env
├── docker-compose.yml          # Auxiliary services such as postgresql via docker
├── knexfile.js                 # Configuration for knex.js
├── migrations/                 # Database migrations. See below for more info
├── seeds/                      # Database seeds. See below for more info
├── tests/                      # Integration tests using supertest
├── sqlite3/                    # SQLite3 database location
└── src/
    ├── db.js                   # DB instance used by the app and/or models
    ├── models/                 # ORM models written in ES6 classes
    ├── middleware/             # Custom middleware to be used by modules
    ├── modules/                # Route-Controller pair for koa2
    │   ├── auth/               # Sample /authenticate module
    │   ├── graphql/            # GraphQL
    │   └── index.js            # Don't touch this
    ├── passport.js             # Passport.js configuration using passport-local
    ├── DataLoader.js           # Data fetching layer for GraphQL
    ├── schema.js               # GraphQL schema
    └── types/                  # GraphQL types
```

## Testing

K2 uses [Facebook Jest](https://facebook.github.io/jest/) so you can add a
directory named `__tests__` at any level and start writing tests.

Root level `tests` directory is reserved for integration tests using supertest.
Currently requires you to run the database server via docker-compose: see above.

```
yarn test                 # Run all tests including unit and integration tests
yarn test:unit            # Only run unit tests inside src/ directory
yarn test:integration     # Only run integration tests inside tests/ directory
yarn test:coverage        # Generate coverage report. Also travis default
```

## Deployments

This is a standard Node.js version 8.0+ application. You can deploy it to
anywhere you like including, but not limited to:

- [now.sh](https://zeit.co/now)
- [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
- Pretty much anything that runs docker or Node.js

### Now.sh

Deploying to now is super simple if you're using SQLite3 (default). Just run:

```
now
```

### AWS ElasticBeanstalk

Simply create a version of AWS EB with Node version 8.0.1 and deploy. I
personally have travis CI deploy it via a `eb` script.

- TODO: Sample `.ebextensions/`
- Database is already configured to prefer `RDS_{HOSTNAME,DB_NAME,USERNAME,PASSWORD}` connection information
