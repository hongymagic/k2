![K2](https://gist.githubusercontent.com/hongymagic/44b775944afd136e2cafbde8868b7df2/raw/3edeb106a828b538808ecb7252112a5fedf62da9/logo.png)

# K2

[![Build Status](https://travis-ci.org/hongymagic/k2.svg?branch=master)](https://travis-ci.org/hongymagic/k2) [![codecov](https://codecov.io/gh/hongymagic/k2/branch/master/graph/badge.svg)](https://codecov.io/gh/hongymagic/k2) ![Package dependencies](https://david-dm.org/hongymagic/k2.svg)

Koa 2 and GraphQL server that _just works™_.

## Getting started

Make sure you have Docker installed as PostgreSQL is run on the docker
container.

```
git clone -o k2 -b master --single-branch https://github.com/hongymagic/k2.git example-api

cd example-api                  # Change current directory to the newly created one
docker-compose up               # Launch all auxiliary services (i.e., PostgresSQL)
cp .env.sample .env             # Configuration on development mode is done via dotenv
yarn migrate:latest             # Run database migrations
yarn seed:run                   # Add some seed data
yarn start:dev                  # Start the server in development mode
```

By default the API server starts on port 5000, http://localhost:5000

## Testing

TODO

## Debugging

TODO

## Deployments

### Now.sh

```
now
```


### AWS ElasticBeanstalk

- Database is already configured to prefer `RDS\_{HOSTNAME,DB_NAME,USERNAME,PASSWORD}` connection information
