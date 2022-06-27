-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
    id GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR NOT NULL,
    email VARCHAR,
    avatar VARCHAR
);