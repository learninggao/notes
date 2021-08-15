create database notes;

create table topic (
  id serial PRIMARY KEY,
  topic_name text NOT NULL,
  is_hidden boolean NOT NULL DEFAULT false,
  default_order serial NOT NULL,
  custom_order integer NOT NULL DEFAULT 10000,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- link | code | image | exercise
create table note_type (
  type TEXT PRIMARY KEY
);

-- bootstrap | basic | intermediate | advanced | misc
create table note_level (
  level TEXT PRIMARY KEY
);

create table note (
  id serial PRIMARY KEY,
  default_order serial NOT NULL,
  custom_order integer NOT NULL DEFAULT 10000,
  type text REFERENCES note_type (type) ON UPDATE CASCADE,
  description TEXT,
  url TEXT,
  level text REFERENCES note_level (level) ON UPDATE CASCADE,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  notes text[] NOT NULL DEFAULT '{}',
  todos text[] NOT NULL DEFAULT '{}',
  topic_id integer REFERENCES topic (id)
);

create table tag (
  id serial PRIMARY KEY,
  tag_name TEXT NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table note_tag (
  id serial PRIMARY KEY,
  note_id integer REFERENCES note (id),
  tag_id integer REFERENCES tag (id)
);

-- later actions

ALTER TABLE "note"
ALTER "level" TYPE text,
ALTER "level" SET DEFAULT 'misc',
ALTER "level" DROP NOT NULL;


