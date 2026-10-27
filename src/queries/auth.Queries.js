import { pool } from "../db.js";

export const findUserBYId = async (id) => {
  const result = await pool.query(
    "SELECT id, username FROM users where id=$1",
    [id],
  );
  return result.rows[0] || null;
};

export const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT id,username,password FROM users where username=$1",
    [username],
  );
  return result.rows[0] || null;
};

export const createUser = async (username, password) => {
  const result = await pool.query(
    "insert into users(username,password) values($1,$2) returning id,username",
    [username, password],
  );
  return result.rows[0] || null;
};
