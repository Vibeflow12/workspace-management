import dotenv from "dotenv";
import { Pool } from "pg"

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on("error", (error) => {
  console.error("ERROR FORM DB: ", error);
});

const createTables = `
  CREATE TABLE IF NOT EXISTS users(
  id                SERIAL PRIMARY KEY,
  username          TEXT  UNIQUE NOT NULL,
  password          TEXT  NOT NULL
  );
  CREATE TABLE IF NOT EXISTS workspace(
  id                SERIAL PRIMARY KEY,
  name              TEXT  NOT NULL,
  user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tasks(
  id                SERIAL PRIMARY KEY,
  title             TEXT  NOT NULL,
  description       TEXT,
  completed         BOOLEAN DEFAULT FALSE,
  workspace_id      INTEGER REFERENCES workspace(id) ON DELETE CASCADE NOT NULL
    );
  `;

export async function connectDB() {
  try {
    await pool.connect();
    console.log("connected to db...")
    await pool.query(createTables)
    console.log("all tables are created...")
  } catch (error) {
    console.error("ERROR while connecting to db:", error)
  }
}
