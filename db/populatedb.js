#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS teaName (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    teaName VARCHAR ( 255 ),
    country VARCHAR ( 255 ),
    decaf BOOL,
    stock  INTEGER,
    type VARCHAR ( 255 ),
);`

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/teaName",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();