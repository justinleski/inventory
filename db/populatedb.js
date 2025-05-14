#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `


CREATE TABLE IF NOT EXISTS tea_type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS country_origin (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    country_name TEXT NOT NULL
);




CREATE TABLE IF NOT EXISTS tea_name (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tea_name TEXT,
    decaf BOOL,
    stock  INTEGER,

    type_id INTEGER,
    FOREIGN KEY (type_id) REFERENCES tea_type(id),

    country_id INTEGER,
    FOREIGN KEY (country_id) REFERENCES country_origin(id)
);



-- Tea types
INSERT INTO tea_type (name) VALUES
  ('Green'),
  ('Black'),
  ('Oolong')
ON CONFLICT DO NOTHING;

-- Countries
INSERT INTO country_origin (country_name) VALUES
  ('Japan'),
  ('India'),
  ('China')
ON CONFLICT DO NOTHING;

-- Teas
INSERT INTO tea_name (tea_name, decaf, stock, type_id, country_id) VALUES
  ('Sencha', false, 30, 1, 1),
  ('Assam', false, 20, 2, 2),
  ('Tieguanyin', false, 15, 3, 3);


`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
main();