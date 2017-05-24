# K2

Koa 2 and GraphQL server that _just works™_.

## Getting started

Make sure you have Docker installed as PostgreSQL is run on the docker
container.

```
git clone -o k2 -b master --single-branch \
   https://github.com/hongymagic/k2.git example-api
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

TODO
