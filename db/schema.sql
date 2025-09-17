-- Moodify Database Schema

DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS moods;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  password_hash text NOT NULL
);


CREATE TABLE moods (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text 
);

CREATE TABLE user_activities (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  mood_id integer REFERENCES moods(id) ON DELETE CASCADE,
  description text NOT NULL
);

 