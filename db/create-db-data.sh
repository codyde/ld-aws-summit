#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE localdb;
    \connect localdb;
	CREATE TABLE users (
    	id        SERIAL PRIMARY KEY,
    	username       TEXT
	);
    INSERT into users (username) VALUES ('cody');
    INSERT into users (username) VALUES ('jon');
    INSERT into users (username) VALUES ('sarah');
EOSQL