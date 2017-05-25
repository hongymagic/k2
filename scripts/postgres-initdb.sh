#!/bin/sh -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE production;
  CREATE DATABASE development;
  CREATE DATABASE test;
EOSQL
